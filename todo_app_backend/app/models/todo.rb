class Todo < ApplicationRecord
  belongs_to :category, optional: true

  validates :todo_name, presence: true
  validates :description, length: { maximum: 500 }, allow_blank: true
end
