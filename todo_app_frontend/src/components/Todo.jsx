import React from "react";

const Todo = ({ id, todo_name, completed, category, onToggleCompleted, onDeleteTodo }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      {/* Checkbox para alternar estado */}
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggleCompleted(id, !completed)}
        style={{ marginRight: "10px" }}
      />

      {/* Nome da Tarefa */}
      <span
        style={{
          textDecoration: completed ? "line-through" : "none",
          flex: 1,
        }}
      >
        {todo_name}
        {category && (
          <em style={{ color: "#888", marginLeft: "10px" }}>({category.name})</em>
        )}
      </span>

      {/* Botão de Excluir */}
      <button
        onClick={() => onDeleteTodo(id)}
        style={{
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Excluir
      </button>
    </div>
  );
};

export default Todo;
