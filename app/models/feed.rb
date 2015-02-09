require 'open-uri'

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
      feed = Feed.create!(
      title: feed_data.title,
      url: url,
      image: feed_data.image)
      
      feed_data.entries.each do |entry_data|
      # add helper that if the entry data is < certain time, add it
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
    begin
      feed_data = SimpleRSS.parse(open(url))
      self.title = feed_data.title
      save!

      existing_entry_guids = Entry.pluck(:guid).sort
      feed_data.entries.each do |entry_data|
        unless existing_entry_guids.include?(entry_data.guid)
          Entry.create_from_json!(entry_data, self)
        end
      end

      self
    rescue SimpleRSSError
      return false
    end
  end

end
