class Api::EntriesController < ApplicationController
  def index
      feed = Feed.find(params[:feed_id])
      render json: feed.latest_entries
  end

  def show
    begin
      render json: Entry.find(params[:id])
    rescue
      render json: { error: "Entry not found." }, status: :not_found
    end
  end
end
