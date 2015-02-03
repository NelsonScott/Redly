Redly::Application.routes.draw do
  root to: 'users#index'
  resources :users
  resource :session
end
