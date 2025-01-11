module Api
  class UsersController < ApplicationController
    def show
      user = User.find(params[:id])
      render json: user
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Usuário não encontrado" }, status: :not_found
    end

    def update
      user = User.find(params[:id])
      if user.update(user_params)
        render json: user
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:xp, :level, :name)
    end
  end
end
