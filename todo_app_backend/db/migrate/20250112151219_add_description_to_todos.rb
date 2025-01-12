class AddDescriptionToTodos < ActiveRecord::Migration[8.0]
  def change
    add_column :todos, :description, :text
  end
end
