class AddDescriptionToTodos < ActiveRecord::Migration[8.0]
  # Define uma classe de migração chamada `AddDescriptionToTodos`.
  # A versão `[8.0]` indica que essa migração foi gerada para o Rails 8.0 ou superior.

  def change
    # O método `change` define as alterações que serão feitas no banco de dados
    # quando a migração for executada.

    add_column :todos, :description, :text
    # Adiciona uma nova coluna chamada `description` à tabela `todos`.
    # O tipo da coluna é `text`, que permite armazenar textos longos,
    # ao contrário de `string`, que é mais adequado para textos curtos.
  end
end
