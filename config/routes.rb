Redly::Application.routes.draw do
  root 'static_pages#home'
  resources :users
  resource :session

  namespace :api do
    resources :feeds, only: [:index, :create, :show] do
      resources :entries, only: [:index, :create, :show]
    end
    resources :entries, only: [:index]
  end
end
