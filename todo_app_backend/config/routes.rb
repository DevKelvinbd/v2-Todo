Rails.application.routes.draw do
  namespace :api do
    resources :todos do
      member do
        patch :update_completed # Rota para atualizar o status de uma tarefa específica
      end
      collection do
        delete :completed # Rota para apagar todas as tarefas concluídas
      end
    end
    resources :categories, only: [:index, :create, :destroy] # Rotas para categorias
    resources :users, only: [:show, :update] # Rotas para usuários
  end
end
