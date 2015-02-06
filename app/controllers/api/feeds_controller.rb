require 'uri'

class Api::FeedsController < ApplicationController
# not best form, edit this
  def index
    render json: current_user.feeds, include: :latest_entries
  end

  def show
    begin
      feed = current_user.feeds.find(params[:id])
      render json: feed, include: :latest_entries
    rescue
      render json: { error: "Feed not found." }, status: :not_found
    end
  end

  def create
    if !valid?(feed_params[:url])
      render json: {error: "Invalid URL Format."}, status: :unprocessable_entity
    else
      feed = Feed.find_or_create(feed_params[:url])

      if (current_user.feeds.include?(feed))
        render json: feed, include: :latest_entries
      elsif (feed)
        UserFeed.create!(user_id: current_user.id, feed_id: feed.id)
        render json: feed, include: :latest_entries
      else
        render json: {error: "Unable to Create Feed."}, status: :unprocessable_entity
      end
    end
  end

  def destroy
    begin
      feed = current_user.feeds.find(params[:id])
      feed.destroy
      render json: {}
    rescue
      render json: { error: "Feed not found." }, status: :not_found
    end
  end

  private
  def feed_params
    params.require(:feed).permit(:title, :url)
  end

  def valid?(url)
    uri = URI.parse(url)
    uri.kind_of?(URI::HTTP)
  rescue URI::InvalidURIError
    false
  end
end
