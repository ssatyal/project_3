Rails.application.routes.draw do
  resources :trips do
    resources :locations, only: [:index, :new, :create]
  end
  resources :locations, except: [:index, :new, :create]
  root to:"trips#home"
end
