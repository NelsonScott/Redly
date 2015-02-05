class Api::EntriesController < ApplicationController
  def index
    feed = Feed.find(params[:feed_id])
    render json: feed.entries
  end

  def show
    begin
      feed = Feed.find(params[:feed_id])
      render json: Entry.find(params[:id])
    rescue
      render json: { error: "Feed or Entry not found." }, status: :not_found
    end
  end
end
