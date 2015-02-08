class RatingsController < ApplicationController
  def create
    rating = current_user.ratings.find_by_entry_id(rating_params[:entry_id])
    entry_val = rating_params[:entry_val]

    if (rating)
      rating.entry_val = entry_val
      rating.save!
      render text: "Updated rating."
    else
      current_user.ratings.create!(
      entry_val: entry_val,
      user_id: current_user.id,
      entry_id: rating_params[:entry_id])
      render text: "Added rating."
    end
  end

  def show
    entry = Entry.find(params[:id])

    if (entry.average_rating)
      render text: entry.average_rating
    else
      render text: "No ratings yet."
    end
  end

  private
  def rating_params
    params.permit(:entry_id, :entry_val)
  end
end
