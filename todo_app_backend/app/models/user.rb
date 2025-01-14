class User < ApplicationRecord
  # Validação para garantir que o campo `name` esteja presente.
  validates :name, presence: true
  # Isso significa que o nome do usuário não pode estar vazio ou `nil`.

  # Validação para garantir que o campo `xp` seja numérico e maior ou igual a 0.
  validates :xp, numericality: { greater_than_or_equal_to: 0 }
  # Isso evita valores negativos para o XP, garantindo que seja um número válido.

  # Validação para garantir que o campo `level` seja numérico e maior que 0.
  validates :level, numericality: { greater_than: 0 }
  # Isso garante que o nível do usuário seja sempre positivo e maior que zero.
end
