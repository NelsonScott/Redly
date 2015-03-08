class SessionsController < ApplicationController
  def new
    @user = User.new()
  end

  def create
    @user = User.find_by_credentials(params[:user])

    if @user
      sign_in!(@user)
      redirect_to root_url
    else
      @user ||= User.new()
      @user.user_name = params[:user][:user_name]
      render text: "Invalid Username or Password.", status: :unprocessable_entity
    end
  end

  def destroy
    sign_out!
    render text: "loggedOut"
  end
end
