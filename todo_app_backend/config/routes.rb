Rails.application.routes.draw do
  namespace :api do
    resources :todos do
      member do
        patch :update_completed
      end
    end
    resources :categories, only: [:index, :create, :destroy]

  end
end