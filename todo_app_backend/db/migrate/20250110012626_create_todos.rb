class CreateTodos < ActiveRecord::Migration[8.0]
  # Define uma classe de migração chamada `CreateTodos`.
  # A versão `[8.0]` indica que essa migração foi gerada para o Rails 8.0 ou superior.

  def change
    # O método `change` define as alterações que serão feitas no banco de dados
    # quando a migração for executada.

    create_table :todos do |t|
      # Cria uma tabela chamada `todos` no banco de dados.

      t.string :todo_name
      # Adiciona uma coluna chamada `todo_name` do tipo `string` (texto curto),
      # usada para armazenar o nome da tarefa.

      t.boolean :completed
      # Adiciona uma coluna chamada `completed` do tipo `boolean` (verdadeiro/falso),
      # usada para indicar se a tarefa foi concluída ou não.

      t.integer :category_id
      # Adiciona uma coluna chamada `category_id` do tipo `integer`,
      # usada para armazenar o ID da categoria associada à tarefa.
      # Este campo é uma chave estrangeira implícita, conectando `todos` à tabela `categories`.

      t.timestamps
      # Adiciona duas colunas padrão: `created_at` e `updated_at`.
      # Essas colunas são automaticamente gerenciadas pelo Rails para registrar
      # a data de criação e a última atualização de cada registro.
    end
  end
end
