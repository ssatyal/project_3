Rails.application.routes.draw do
  resources :trips do
    resources :locations, only: [:index, :new, :create] do
      get "search", on: :collection
    end
  end
  resources :locations, except: [:index, :new, :create]
  root to:"trips#home"
end
