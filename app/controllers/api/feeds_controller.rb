require 'uri'

class Api::FeedsController < ApplicationController
  def index
    if params[:searchTerm]
      search_term = params[:searchTerm]
      results = Feed.where("UPPER(title) LIKE ?", "%"+ search_term.upcase + "%")
      render json: results.to_json
    else
      @feeds = current_user.feeds
    end
  end

  def show
    @feed = current_user.feeds.find_by(id: params[:id])

    if (@feed)
      @feed
    else
      render json: { error: "Feed not found." }, status: :not_found
    end
  end

  def create
    if !valid?(feed_params[:url])
      render json: {error: "Invalid URL Format."}, status: :unprocessable_entity
    else
      @feed = Feed.find_or_create(feed_params[:url])

      if (current_user.feeds.include?(@feed))
        render :show
      elsif (@feed)
        UserFeed.create!(user_id: current_user.id, feed_id: @feed.id)
        render :show
      else
        render json: {error: "Unable to Create Feed."}, status: :unprocessable_entity
      end
    end
  end

  def destroy
    feed = current_user.feeds.find_by(id: params[:id])

    if (feed)
      feed.destroy
      render json: {}
    else
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
