module Api
  class TodosController < ApplicationController
    # Callback executado antes das ações especificadas para buscar a tarefa pelo ID.
    before_action :set_todo, only: %i[show update destroy update_completed]

    # GET /api/todos
    def index
      # Busca todas as tarefas, ordenadas pela data de criação em ordem decrescente.
      # Inclui as categorias associadas para evitar consultas adicionais (eager loading).
      todos = Todo.order(created_at: :desc).includes(:category)
      render json: todos.to_json(include: :category)
      # Retorna as tarefas em formato JSON, incluindo os dados da categoria associada.
    end

    # GET /api/todos/1
    def show
      render json: @todo.to_json(include: :category)
      # Retorna os detalhes da tarefa específica, incluindo os dados da categoria associada.
    end

    # POST /api/todos
    def create
      @todo = Todo.new(todo_params) # Inicializa uma nova tarefa com os parâmetros fornecidos.

      if @todo.save
        render json: @todo, status: :created
        # Retorna a tarefa criada e o status HTTP 201 (Created) se for salva com sucesso.
      else
        render json: { errors: @todo.errors }, status: :unprocessable_entity
        # Retorna os erros de validação e o status HTTP 422 (Unprocessable Entity) em caso de falha.
      end
    end

    # PATCH/PUT /api/todos/1
    def update
      if @todo.update(todo_params)
        render json: @todo
        # Retorna a tarefa atualizada se a operação for bem-sucedida.
      else
        render json: { errors: @todo.errors }, status: :unprocessable_entity
        # Retorna os erros de validação em caso de falha.
      end
    end

    # PATCH /api/todos/1/update_completed
    def update_completed
      if @todo.update(completed: params[:completed])
        render json: @todo
        # Atualiza apenas o campo `completed` da tarefa e retorna a tarefa atualizada.
      else
        render json: { errors: @todo.errors }, status: :unprocessable_entity
        # Retorna os erros de validação em caso de falha.
      end
    end

    # DELETE /api/todos/1
    def destroy
      @todo.destroy
      head :no_content
      # Exclui a tarefa e retorna o status HTTP 204 (No Content) sem corpo na resposta.
    end

    # DELETE /api/todos/completed
    def completed
      Todo.where(completed: true).destroy_all
      # Exclui todas as tarefas que estão marcadas como concluídas.
      head :no_content
      # Retorna o status HTTP 204 (No Content) sem corpo na resposta.
    end

    private

    # Callback para buscar a tarefa pelo ID.
    def set_todo
      @todo = Todo.find(params[:id])
      # Busca a tarefa no banco de dados pelo ID fornecido nos parâmetros.
    end

    # Filtra os parâmetros permitidos para criação ou atualização de tarefas.
    def todo_params
      params.require(:todo).permit(
        :id, :todo_name, :completed, :category_id, :difficulty, :description, :created_at, :updated_at
      )
      # Exige que os parâmetros incluam um objeto `todo` e permite apenas os campos especificados.
    end
  end
end
