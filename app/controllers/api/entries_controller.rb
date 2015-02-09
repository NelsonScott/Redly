class Api::EntriesController < ApplicationController
  def show
    @entry = Entry.find_by(id: params[:id])
  end
end
