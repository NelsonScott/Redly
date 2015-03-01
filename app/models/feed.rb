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

  def latest_entries
    reload if updated_at < 30.seconds.ago
    entries
  end

  def reload
    self.entries = []

    begin
      feed_data = SimpleRSS.parse(open(self.url))

      feed_data.entries.each do |entry_data|
        Entry.create_from_json!(entry_data, self)
      end
    rescue SimpleRSSError
      return nil
    end

    # begin
    #   feed_data = SimpleRSS.parse(open(url))
    #   self.title = feed_data.title
    #   save!
    #
    #   existing_entry_guids = Entry.pluck(:guid).sort
    #   feed_data.entries.each do |entry_data|
    #     unless existing_entry_guids.include?(entry_data.guid)
    #       Entry.create_from_json!(entry_data, self)
    #     end
    #   end
    #
    #   self
    # rescue SimpleRSSError
    #   return false
    # end
  end

  def self.ensure_img(image)
    uri = URI(image)
    request = Net::HTTP.new uri.host
    response = request.request_head uri.path

    if (response.code.to_i == 200)
      return image
    else
      return nil
    end
  end

end
