class Entry < ActiveRecord::Base
  belongs_to :feed

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
