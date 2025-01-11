class AddDifficultyToTodos < ActiveRecord::Migration[8.0]
  def change
    add_column :todos, :difficulty, :string
  end
end
