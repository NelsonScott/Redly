class Feed < ActiveRecord::Base
  validates :title, :user_id, :url, presence: true
  has_many :user_feeds
  has_many :users, through: :user_feeds 

  def find_or_create(url)
    feed = Feed.find_by(url: url)
    return feed if feed

    begin
      feed_data = SimpleRSS.parse(open(url))
      feed = Feed.create!(title: feed_data.title, url: url)
      feed_data.entries.each do |entry_data|
        Entry.create_from_json!(entry_data, feed)
      end
    rescue SimpleRSSError
      return nil
    end

    feed
  end
end
