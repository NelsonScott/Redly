class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(params[:user_name])

    if @user
      login_user!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid email or password."]
      render :new
    end
  end

  def destroy
    sign_out!
    redirect_to users_url
  end
end
