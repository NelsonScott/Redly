class UsersController < ApplicationController
  def new
    @user = User.new()
    render :new
  end

  def index
    @users = User.all
    render json: @users
  end

  def create
    @user = User.new(user_params)

    if @user.save
      @user.user_feeds.create(feed_id: Feed.first.id, user_id: @user.id)
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render text: @user.errors.full_messages.join("<br>"), status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  private
  def user_params
    params.require(:user).permit(:user_name, :password, :email)
  end

end
