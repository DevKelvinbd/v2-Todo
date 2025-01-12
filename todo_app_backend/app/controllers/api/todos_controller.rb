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
      render json: @todo.to_json(include: :category)
    end

    # POST /api/todos
    def create
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

    # DELETE /api/todos/completed
    def completed
      Todo.where(completed: true).destroy_all
      head :no_content
    end

    private

    def set_todo
      @todo = Todo.find(params[:id])
    end

    def todo_params
      params.require(:todo).permit(:todo_name, :completed, :category_id, :difficulty, :description)
    end
  end
end
