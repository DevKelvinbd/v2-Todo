class Todo < ApplicationRecord
  # Associação com o modelo `Category`.
  # Indica que cada tarefa (Todo) pertence a uma categoria.
  # O `optional: true` significa que a associação é opcional, ou seja,
  # uma tarefa pode ser criada sem estar associada a uma categoria.
  belongs_to :category, optional: true

  # Validação para garantir que o campo `todo_name` esteja presente.
  validates :todo_name, presence: true
  # Isso significa que o nome da tarefa não pode estar vazio ou `nil`.

  # Validação para o campo `description`.
  validates :description, length: { maximum: 500 }, allow_blank: true
  # Isso garante que a descrição não ultrapasse 500 caracteres.
  # O `allow_blank: true` permite que a descrição seja opcional.
end
