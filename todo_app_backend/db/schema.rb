ActiveRecord::Schema[8.0].define(version: 2025_01_12_151219) do
  # Habilita a extensão necessária para o PostgreSQL
  enable_extension "pg_catalog.plpgsql"

  # Tabela de categorias
  create_table "categories", force: :cascade do |t|
    t.string "name" # Nome da categoria
    t.datetime "created_at", null: false # Data de criação da categoria
    t.datetime "updated_at", null: false # Data da última atualização da categoria
  end

  # Tabela de tarefas (todos)
  create_table "todos", force: :cascade do |t|
    t.string "todo_name" # Nome da tarefa
    t.boolean "completed" # Indica se a tarefa foi concluída
    t.integer "category_id" # Referência à tabela de categorias
    t.datetime "created_at", null: false # Data de criação da tarefa
    t.datetime "updated_at", null: false # Data da última atualização da tarefa
    t.string "difficulty" # Nível de dificuldade da tarefa
    t.text "description" # Descrição detalhada da tarefa
  end

  # Tabela de usuários
  create_table "users", force: :cascade do |t|
    t.string "name" # Nome do usuário
    t.integer "xp" # Pontos de experiência do usuário
    t.integer "level" # Nível atual do usuário
    t.datetime "created_at", null: false # Data de criação do registro do usuário
    t.datetime "updated_at", null: false # Data da última atualização do registro do usuário
  end
end
