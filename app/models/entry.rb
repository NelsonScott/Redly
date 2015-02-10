class Entry < ActiveRecord::Base
  belongs_to :feed
  has_many :ratings, dependent: :destroy

  def self.create_from_json!(entryData, feed)
    image = get_image(entryData)

    Entry.create!({
      guid: entryData.guid,
      link: entryData.link,
      published_at: entryData.pubDate,
      title: entryData.title,
      json: entryData.to_json,
      feed_id: feed.id,
      image: image
    })
  end


  def self.get_image(entryData)
    return entryData[:media_content_url] if entryData[:media_content_url]

    get_photo_url(entryData.link)
  end

  def self.get_photo_url(url)
    if !Nokogiri::HTML(open(url)).css("meta[property='og:image']").blank?
      doc = Nokogiri::HTML(open(url))
      target = doc.css("meta[property='og:image']")
      photo_url = target.first.attributes["content"]
      photo = URI.parse(photo_url)
      return photo.to_s
    end
  end

  def average_rating
    ratings.average(:entry_val).to_f
  end
end
