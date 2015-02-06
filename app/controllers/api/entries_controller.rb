class Api::EntriesController < ApplicationController
  def index
    if (params[:feed_id])
      feed = Feed.find(params[:feed_id])
      render json: feed.entries
    else
      render json: current_user.entries
    end
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
