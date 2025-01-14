class Category < ApplicationRecord
  # Associação com o modelo `Todo`.
  # Indica que uma categoria pode estar associada a várias tarefas (todos).
  # O `dependent: :nullify` garante que, ao excluir uma categoria, o campo `category_id` das tarefas relacionadas será definido como `null`.
  # Isso evita a exclusão em cascata das tarefas associadas.
  has_many :todos, dependent: :nullify

  # Validação para garantir que o campo `name` esteja presente.
  validates :name, presence: true
  # Isso significa que o nome da categoria não pode estar vazio ou `nil`.
end
