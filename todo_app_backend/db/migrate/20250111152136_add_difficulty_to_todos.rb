class AddDifficultyToTodos < ActiveRecord::Migration[8.0]
  # Define uma classe de migração chamada `AddDifficultyToTodos`.
  # A versão `[8.0]` indica que essa migração foi gerada para o Rails 8.0 ou superior.

  def change
    # O método `change` define as alterações que serão feitas no banco de dados
    # quando a migração for executada.

    add_column :todos, :difficulty, :string
    # Adiciona uma nova coluna chamada `difficulty` à tabela `todos`.
    # O tipo da coluna é `string` (texto curto), usado para armazenar o nível de dificuldade.
  end
end
