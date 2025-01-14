class CreateUsers < ActiveRecord::Migration[8.0]
  # Define uma classe de migração chamada `CreateUsers`.
  # A versão `[8.0]` indica que essa migração foi gerada para o Rails 8.0 ou superior.

  def change
    # O método `change` define as alterações que serão feitas no banco de dados
    # quando a migração for executada.

    create_table :users do |t|
      # Cria uma tabela chamada `users` no banco de dados.

      t.string :name
      # Adiciona uma coluna chamada `name` do tipo `string` (texto curto),
      # usada para armazenar o nome do usuário.

      t.integer :xp
      # Adiciona uma coluna chamada `xp` do tipo `integer` (número inteiro),
      # usada para armazenar os pontos de experiência do usuário.

      t.integer :level
      # Adiciona uma coluna chamada `level` do tipo `integer` (número inteiro),
      # usada para armazenar o nível do usuário.

      t.timestamps
      # Adiciona duas colunas padrão: `created_at` e `updated_at`.
      # Essas colunas são automaticamente gerenciadas pelo Rails para registrar
      # a data de criação e a última atualização de cada registro.
    end
  end
end