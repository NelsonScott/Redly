class Entry < ActiveRecord::Base
  belongs_to :feed
  has_many :ratings, dependent: :destroy

  def self.create_from_json!(entryData, feed)
    image = get_image(entryData)

    Entry.create!({
      guid: shorten(entryData.guid),
      link: shorten(entryData.link),
      published_at: entryData.pubDate,
      title: shorten(entryData.title),
      json: entryData.to_json,
      feed_id: feed.id,
      image: ensure_img(image)
    })
  end

  def self.shorten(str)
    if (str.length > 225)
      return str[0..225]
    end

    str
  end

  def self.ensure_img(image)
    uri = URI(image)
    request = Net::HTTP.new uri.host
    response= request.request_head uri.path

    if (response.code.to_i == 200)
      return image
    else
      return nil
    end
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
