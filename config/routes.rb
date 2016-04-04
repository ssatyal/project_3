Rails.application.routes.draw do
  resources :trips
  root to:"trips#home"
end
