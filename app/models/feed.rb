require 'open-uri'
require 'nokogiri'

class Feed < ActiveRecord::Base
  validates :title, :url, presence: true
  has_many :user_feeds, dependent: :destroy
  has_many :users, through: :user_feeds
  has_many :entries, dependent: :destroy
  has_many :ratings, through: :entries, dependent: :destroy

  def self.find_or_create(url)
    feed = Feed.find_by(url: url)
    return feed if feed

    begin
      feed_data = SimpleRSS.parse(open(url))
      doc = Nokogiri::HTML( feed_data.try(:image) )
      img_srcs = doc.css('url')
      if img_srcs.children && img_srcs.children.first
        img = ensure_img(img_srcs.children.first.content)
      else
        img = nil
      end

      feed = Feed.create!(
      title: feed_data.title,
      url: url,
      description: feed_data.description,
      image: img
      )

      feed_data.entries.each do |entry_data|
        Entry.create_from_json!(entry_data, feed)
      end
    rescue SimpleRSSError
      return nil
    end

    feed
  end

  def reload
    begin
      feed_data = SimpleRSS.parse(open(self.url))

      old_entry_guids = self.entries.pluck(:guid).sort
      feed_data.entries.each do |entry_data|
        unless old_entry_guids.include?(entry_data.guid)
          Entry.create_from_json!(entry_data, self)
        end
      end
    rescue SimpleRSSError
      return nil
    end

    self.entries.each do |entry|
      if entry.created_at < 1.week.ago
        cloud_img_id = entry.cloud_img_id
        cloud_thumb_id = entry.cloud_thumb_id
        Cloudinary::Api.delete_resources(cloud_img_id) if cloud_img_id
        Cloudinary::Api.delete_resources(cloud_thumb_id) if cloud_thumb_id

        entry.destroy
      end
    end
  end

  def self.ensure_img(image)
    begin
      uri = URI(image)
      request = Net::HTTP.new uri.host
      response = request.request_head uri.path

      if (response.code.to_i == 200)
        return image
      else
        return nil
      end
    rescue
      return nil
    end
  end

end
