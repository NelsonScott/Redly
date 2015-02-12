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
      # flash.now[:errors] = ["Invalid email or password."]
      render text: "Invalid email or password.", status: :unprocessable_entity
    end
  end

  def destroy
    sign_out!
    # redirect_to new_session_url
    render text: "loggedOut"
  end
end
