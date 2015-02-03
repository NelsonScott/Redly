Redly::Application.routes.draw do
  root 'static_pages#home'
  resources :users
  resource :session
end
