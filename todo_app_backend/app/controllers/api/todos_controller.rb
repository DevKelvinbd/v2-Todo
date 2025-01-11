module Api
  class TodosController < ApplicationController
    before_action :set_todo, only: %i[show update destroy update_completed]

    # GET /api/todos
    def index
      todos = Todo.order(created_at: :desc).includes(:category)
      render json: todos.to_json(include: :category)
    end

    # GET /api/todos/1
    def show
      # @todo vem do set_todo
      render json: @todo.to_json(include: :category)
    end

    # POST /api/todos
    def create
      # se estiver usando params.require(:todo):
      # @todo = Todo.new(todo_params)
      # se estiver usando params diretos:
      @todo = Todo.new(todo_params)

      if @todo.save
        render json: @todo, status: :created
      else
        render json: { errors: @todo.errors }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /api/todos/1
    def update
      if @todo.update(todo_params)
        render json: @todo
      else
        render json: { errors: @todo.errors }, status: :unprocessable_entity
      end
    end

    # PATCH /api/todos/1/update_completed
    def update_completed
      if @todo.update(completed: params[:completed])
        render json: @todo
      else
        render json: { errors: @todo.errors }, status: :unprocessable_entity
      end
    end

    # DELETE /api/todos/1
    def destroy
      @todo.destroy
      head :no_content
    end

    private

    def set_todo
      @todo = Todo.find(params[:id])
    end

    # Ajuste caso use "require(:todo)" ou não
    def todo_params
      # Exemplo sem require(:todo):
      params.require(:todo).permit(:todo_name, :completed, :category_id, :difficulty)
      
      # Se preferir com require(:todo):
      # params.require(:todo).permit(:todo_name, :completed, :category_id)
    end
    
  end
end