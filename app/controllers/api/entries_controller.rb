class Api::EntriesController < ApplicationController
  def show
    entry = Entry.find_by(id: params[:id])

    if entry
      render text: entry.average_rating
    else
      render text: "Rating not found.", status: :not_found
    end
  end
end
