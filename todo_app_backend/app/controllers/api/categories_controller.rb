module Api
  class CategoriesController < ApplicationController
    # Ação para listar todas as categorias.
    def index
      categories = Category.all # Busca todas as categorias do banco de dados.
      render json: categories # Retorna as categorias em formato JSON.
    end

    # Ação para exibir uma categoria específica.
    def show
      category = Category.find(params[:id]) # Busca uma categoria pelo ID fornecido nos parâmetros da rota.
      render json: category # Retorna a categoria encontrada em formato JSON.
    end

    # Ação para criar uma nova categoria.
    def create
      category = Category.new(category_params) # Inicializa uma nova categoria com os parâmetros permitidos.
      if category.save
        # Se a categoria for salva com sucesso:
        render json: category, status: :created # Retorna a categoria criada e o status HTTP 201 (Created).
      else
        # Se ocorrer um erro ao salvar:
        render json: { errors: category.errors }, status: :unprocessable_entity
        # Retorna os erros de validação e o status HTTP 422 (Unprocessable Entity).
      end
    end

    # Ação para atualizar uma categoria existente.
    def update
      category = Category.find(params[:id]) # Busca a categoria pelo ID fornecido.
      if category.update(category_params)
        # Se a categoria for atualizada com sucesso:
        render json: category # Retorna a categoria atualizada em formato JSON.
      else
        # Se ocorrer um erro ao atualizar:
        render json: { errors: category.errors }, status: :unprocessable_entity
        # Retorna os erros de validação e o status HTTP 422 (Unprocessable Entity).
      end
    end

    # Ação para excluir uma categoria.
    def destroy
      category = Category.find(params[:id]) # Busca a categoria pelo ID fornecido.
      category.destroy # Exclui a categoria do banco de dados.
      head :no_content # Retorna um status HTTP 204 (No Content) sem corpo na resposta.
    end

    private

    # Método privado para filtrar os parâmetros permitidos.
    def category_params
      params.require(:category).permit(:name) 
      # Exige que os parâmetros recebidos incluam um objeto `category` 
      # e permite apenas o campo `name`.
    end
  end
end
