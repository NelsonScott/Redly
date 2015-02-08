class Entry < ActiveRecord::Base
  belongs_to :feed
  has_many :ratings, dependent: :destroy

  def self.create_from_json!(entryData, feed)
    Entry.create!({
      guid: entryData.guid,
      link: entryData.link,
      published_at: entryData.pubDate,
      title: entryData.title,
      json: entryData.to_json,
      feed_id: feed.id
    })
  end

end
