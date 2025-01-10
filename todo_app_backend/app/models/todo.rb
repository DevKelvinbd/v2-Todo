class Todo < ApplicationRecord
  belongs_to :category, optional: true
  
  validates :todo_name, presence: true
end
