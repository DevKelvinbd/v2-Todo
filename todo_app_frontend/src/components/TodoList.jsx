import React from "react";

function TodoList({ todos, onToggleCompleted, onDeleteTodo }) {
  return (
    <div>
      <h2>Lista de Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
            {/* Checkbox para marcar como concluído */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleCompleted(todo.id, !todo.completed)}
              style={{ marginRight: "10px" }}
            />
            {/* Nome da tarefa */}
            <span style={{ textDecoration: todo.completed ? "line-through" : "none", flex: 1 }}>
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
    </div>
  );
}

export default TodoList;
