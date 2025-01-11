import React, { useState } from "react";

function TodoList({ todos, onToggleCompleted, onDeleteTodo, categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null); // Categoria selecionada

  // Ordenar as tarefas pela data de criação
  const sortedTodos = [...todos].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  // Filtrar as tarefas pendentes e concluídas
  const pendingTodos = sortedTodos.filter(
    (todo) =>
      !todo.completed &&
      (selectedCategory ? todo.category?.id === selectedCategory : true)
  );
  const completedTodos = sortedTodos.filter((todo) => todo.completed);

  return (
    <div>
      {/* Filtro de categorias */}
      <div style={{ marginBottom: "20px" }}>
        <strong>Filtrar por Categoria: </strong>
        <button
          onClick={() => setSelectedCategory(null)}
          style={{
            marginRight: "10px",
            padding: "5px 10px",
            backgroundColor: selectedCategory === null ? "#2196F3" : "#f1f1f1",
            color: selectedCategory === null ? "white" : "black",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              backgroundColor:
                selectedCategory === category.id ? "#2196F3" : "#f1f1f1",
              color: selectedCategory === category.id ? "white" : "black",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      <h2>Lista de Todos</h2>

      {/* Tarefas pendentes */}
      <h3>Tarefas para fazer</h3>
      {pendingTodos.length === 0 ? (
        <p>Sem tarefas pendentes!</p>
      ) : (
        <ul>
          {pendingTodos.map((todo) => (
            <li
              key={todo.id}
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Checkbox para marcar como concluído */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleCompleted(todo.id, !todo.completed)}
                style={{ marginRight: "10px" }}
              />
              {/* Nome da tarefa */}
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  flex: 1,
                }}
              >
                {todo.todo_name}{" "}
                {todo.category && (
                  <em style={{ color: "#888" }}>({todo.category.name})</em>
                )}
              </span>
              {/* Botão de excluir */}
              <button
                onClick={() => onDeleteTodo(todo.id)}
                style={{
                  padding: "5px 10px",
                  fontSize: "14px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Tarefas concluídas */}
      <h3 style={{ marginTop: "20px" }}>Tarefas concluídas</h3>
      {completedTodos.length === 0 ? (
        <p>Sem tarefas concluídas!</p>
      ) : (
        <ul>
          {completedTodos.map((todo) => (
            <li
              key={todo.id}
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Checkbox para marcar como pendente */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleCompleted(todo.id, !todo.completed)}
                style={{ marginRight: "10px" }}
              />
              {/* Nome da tarefa */}
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  flex: 1,
                }}
              >
                {todo.todo_name}{" "}
                {todo.category && (
                  <em style={{ color: "#888" }}>({todo.category.name})</em>
                )}
              </span>
              {/* Botão de excluir */}
              <button
                onClick={() => onDeleteTodo(todo.id)}
                style={{
                  padding: "5px 10px",
                  fontSize: "14px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
