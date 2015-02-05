class Api::FeedsController < ApplicationController

  def create
    feed = Feed.find_or_create(feed_params[:url])

    if feed.save
      render json: feed
    else
      render json: { error: "invalid url" }, status: :unprocessable_entity
    end
  end

  def index
    render json: Feed.all
  end

  private
  def feed_params
    params.require(:feed).permit(:title, :url)
  end

end
