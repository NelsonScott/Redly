require 'open-uri'
require 'nokogiri'

class Entry < ActiveRecord::Base
  belongs_to :feed
  has_many :ratings, dependent: :destroy

  def self.create_from_json!(entryData, feed)
    image = get_image(entryData)
    if check_img_url_status(image)
      begin
        cloud_img = Cloudinary::Uploader.upload(image)
        cloud_img = cloud_img["secure_url"]
      rescue
        cloud_img = nil
      end
    else
      cloud_img = nil
    end

    image_thumb = entryData.media_thumbnail_url
    if !image_thumb
      cloud_thumb = cloud_img
    else
      begin
        cloud_thumb = Cloudinary::Uploader.upload(image_thumb)
        cloud_thumb = cloud_thumb["secure_url"]
      rescue
        cloud_thumb = nil
      end
    end

    entry_content = get_content(entryData)
    entry_content = ActionController::Base.helpers.strip_tags(entry_content)

    Entry.create!({
      guid: shorten(entryData.guid),
      link: shorten(entryData.link),
      published_at: entryData.pubDate,
      title: shorten(entryData.title),
      feed_id: feed.id,
      image: cloud_img,
      content: entry_content,
      image_thumb: cloud_thumb,
      description: entryData.description
    })
  end

  def self.shorten(str)
    if (str.length > 225)
      return str[0..225]
    end

    str
  end

  def self.get_content(entryData)
    doc = Nokogiri::HTML( open(entryData.link) )
    doc.css('script').remove

    raw = doc.css('.article-entry')

    if raw.any?
      return raw.first.text
    elsif (raw = doc.css('.article-content')).any?
      return raw.first.text
    elsif (raw = doc.css('#articleText')).any?
      return raw.first.text
    else
      return entryData.description
    end
  end


  def self.check_img_url_status(image)
    return nil if !image

    uri = URI(image)
    request = Net::HTTP.new uri.host
    response = request.request_head uri.path

    if ((response.code.to_i >= 400) && (response.code.to_i <= 499))
      return nil
    else
      return image
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
