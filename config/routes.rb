Redly::Application.routes.draw do
  root 'static_pages#home'
  resources :users
  resource :session
  resources :ratings, only: [:create]

  namespace :api do
    resources :feeds, only: [:index, :create, :show, :destroy]
  end
end
