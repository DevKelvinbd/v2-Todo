module Api
  class UsersController < ApplicationController
    # Ação para exibir os detalhes de um usuário específico.
    def show
      user = User.find(params[:id]) 
      # Busca o usuário no banco de dados pelo ID fornecido nos parâmetros.

      render json: user 
      # Retorna os dados do usuário em formato JSON.

    rescue ActiveRecord::RecordNotFound
      # Captura a exceção lançada caso o ID não corresponda a nenhum usuário no banco de dados.
      render json: { error: "Usuário não encontrado" }, status: :not_found
      # Retorna uma mensagem de erro e o status HTTP 404 (Not Found).
    end

    # Ação para atualizar os dados de um usuário específico.
    def update
      user = User.find(params[:id]) 
      # Busca o usuário no banco de dados pelo ID fornecido nos parâmetros.

      if user.update(user_params)
        # Tenta atualizar o usuário com os parâmetros permitidos.
        render json: user 
        # Retorna os dados atualizados do usuário em formato JSON.
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        # Retorna os erros de validação em formato JSON e o status HTTP 422 (Unprocessable Entity).
      end
    end

    private

    # Método privado para filtrar os parâmetros permitidos na atualização de usuários.
    def user_params
      params.require(:user).permit(:xp, :level, :name)
      # Exige que os parâmetros incluam um objeto `user` e permite apenas os campos `xp`, `level` e `name`.
    end
  end
end
