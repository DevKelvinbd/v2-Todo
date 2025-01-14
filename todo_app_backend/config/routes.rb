Rails.application.routes.draw do
  # Define um namespace chamado `api`.
  # Isso significa que todas as rotas definidas dentro deste bloco terão `/api` como prefixo no URL.
  namespace :api do
    # Define rotas RESTful para o recurso `todos` (tarefas).
    resources :todos do
      # Rotas para ações específicas de membro.
      # Um "member" é uma rota que atua sobre um único recurso identificado por um ID.
      member do
        patch :update_completed 
        # Rota PATCH `/api/todos/:id/update_completed`
        # Usada para atualizar o status (como concluído ou não) de uma tarefa específica.
      end

      # Rotas para ações de coleção.
      # Um "collection" atua sobre o conjunto de recursos, sem depender de um ID específico.
      collection do
        delete :completed 
        # Rota DELETE `/api/todos/completed`
        # Usada para excluir todas as tarefas marcadas como concluídas.
      end
    end

    # Define rotas RESTful para o recurso `categories` (categorias).
    # Inclui apenas as ações `index`, `create` e `destroy`.
    resources :categories, only: [:index, :create, :destroy]
    # Rotas geradas:
    # GET    `/api/categories`  -> Ação `index` (listar categorias).
    # POST   `/api/categories`  -> Ação `create` (criar uma nova categoria).
    # DELETE `/api/categories/:id` -> Ação `destroy` (excluir uma categoria específica).

    # Define rotas RESTful para o recurso `users` (usuários).
    # Inclui apenas as ações `show` e `update`.
    resources :users, only: [:show, :update]
    # Rotas geradas:
    # GET  `/api/users/:id` -> Ação `show` (exibir dados de um usuário específico).
    # PUT  `/api/users/:id` -> Ação `update` (atualizar dados de um usuário específico).
  end
end
