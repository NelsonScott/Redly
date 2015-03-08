require 'open-uri'
require 'nokogiri'

class Entry < ActiveRecord::Base
  belongs_to :feed
  has_many :ratings, dependent: :destroy

  def self.create_from_json!(entryData, feed)
    begin
      cloud_img = Cloudinary::Uploader.upload(get_image(entryData), width: 500, height: 500)
      cloud_img_url = cloud_img["secure_url"]
      cloud_img_id = cloud_img["public_id"]
    rescue
      cloud_img_url = nil
      cloud_img_id = nil
    end

    begin
      image_thumb = entryData.media_thumbnail_url
      cloud_thumb = Cloudinary::Uploader.upload(image_thumb, width: 210, height: 117)
      cloud_thumb_url = cloud_thumb["secure_url"]
      cloud_thumb_id = cloud_thumb["public_id"]
    rescue
      cloud_thumb_url = cloud_img
      cloud_thumb_id = cloud_img_id
    end

    begin
      entry_content = get_entry_content(entryData)
    rescue
      entry_content = entryData.description
    end

    Entry.create!({
      guid: shorten(entryData.guid),
      link: shorten(entryData.link),
      published_at: entryData.pubDate,
      title: shorten(entryData.title),
      feed_id: feed.id,
      image: cloud_img_url,
      cloud_img_id: cloud_img_id,
      content: entry_content,
      image_thumb: cloud_thumb_url,
      cloud_thumb_id: cloud_thumb_id,
      description: entryData.description
    })
  end

  def self.get_image(entryData)
    return entryData[:media_content_url] if entryData[:media_content_url]

    get_photo_url(entryData.link)
  end

  def self.get_photo_url(url)
    doc = Nokogiri::HTML(open(url))
    target = doc.css("meta[property='og:image']")
    photo_url = target.first.attributes["content"]
    photo = URI.parse(photo_url)

    return photo.to_s
  end

  def self.get_entry_content(entryData)
    doc = Nokogiri::HTML( open(entryData.link) )
    doc.css('script').remove

    raw_content = doc.css('.article-entry')

    if raw_content.any?
      return raw_content.first.text
    elsif (raw_content = doc.css('.article-content')).any?
      return raw_content.first.text
    elsif (raw_content = doc.css('#articleText')).any?
      return raw_content.first.text
    elsif (raw_content = doc.css('#storytext')).any?
      return raw_content.first.text
    else
      return entryData.description
    end
  end

  def average_rating
    ratings.average(:entry_val).to_f
  end

  def self.shorten(str)
    return str[0..225]
  end

end
