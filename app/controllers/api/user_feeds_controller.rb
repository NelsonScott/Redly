class Api::UserFeedsController < ApplicationController
  def destroy
    user_feed = current_user.user_feeds.find_by(feed_id: params[:id])
    user_feed.destroy

    render text: "Feed deleted."
  end
end
