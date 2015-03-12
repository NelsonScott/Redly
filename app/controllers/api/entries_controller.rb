class Api::EntriesController < ApplicationController
  def show
    @entry = Entry.find_by(id: params[:id])
  end

  def index
    @entries = Feed.find_by(id: params[:feed_id]).entries
  end
end
