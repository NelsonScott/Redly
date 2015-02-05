class Api::FeedsController < ApplicationController

  def create
    feed = Feed.find_or_create(feed_params[:url])

    if (current_user.feeds.include?(feed))
      render json: feed
    else
      UserFeed.create!(user_id: current_user.id, feed_id: feed.id)
      render json: feed
    end

    # if feed.save
    #   render json: feed
    # else
    #   render json: { error: "invalid url" }, status: :unprocessable_entity
    # end
  end

  def show
    begin
      feed = current_user.feeds.find(params[:id])
      render json: feed
      # TODO, :include => :latest_entries
    rescue
      render json: { error: "Feed not found." }, status: :not_found
    end
  end

  def index
    render json: current_user.feeds
  end

  private
  def feed_params
    params.require(:feed).permit(:title, :url)
  end

end
