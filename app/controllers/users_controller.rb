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
    if (user_params[:button])
      @user = User.find_by(user_name: "demo")
      sign_in!(@user)
      redirect_to root_url
    else
      @user = User.new(user_params)

      if @user.save
        sign_in!(@user)
        redirect_to root_url
      else
        flash.now[:errors] = @user.errors.full_messages
        render :new
      end
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  private
  def user_params
    params.require(:user).permit(:user_name, :password, :email, :button)
  end

end
