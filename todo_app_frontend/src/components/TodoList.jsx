import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

function TodoList({ todos, onToggleCompleted, onDeleteTodo, categories }) {
  // Valores de XP por dificuldade
  const xpValues = { easy: 25, medium: 45, hard: 70 };

  // Estados
  const [selectedCategory, setSelectedCategory] = useState(null); // Filtro por categoria
  const [level, setLevel] = useState(1); // Nível do usuário
  const [showConfetti, setShowConfetti] = useState(false); // Controle dos confetes

  // Calcular meta diária com base no nível
  const baseGoal = 500; // Meta base
  const dailyGoal = Math.ceil(baseGoal * (1 + (level - 1) * 0.02)); // Aumenta 2% por nível

  // Calcular XP acumulado das tarefas concluídas
  const totalXP = todos
    .filter((todo) => todo.completed)
    .reduce((acc, todo) => acc + (xpValues[todo.difficulty] || 0), 0);

  // Calcular porcentagem de progresso
  const progressPercentage = Math.min((totalXP / dailyGoal) * 100, 100);

  // Subir de nível e mostrar confetes
  useEffect(() => {
    if (progressPercentage >= 100) {
      setShowConfetti(true);

      // Subir de nível após atingir a meta
      setTimeout(() => {
        setLevel((prevLevel) => prevLevel + 1);
        setShowConfetti(false); // Esconde os confetes após 10 segundos
      }, 10000);
    }
  }, [progressPercentage]);

  // Filtrar tarefas com base na categoria selecionada
  const filteredTodos = selectedCategory
    ? todos.filter((todo) => todo.category?.id === selectedCategory)
    : todos;

  // Separar tarefas pendentes e concluídas
  const pendingTodos = filteredTodos.filter((todo) => !todo.completed);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);

  return (
    <div>
      <h2>Lista de Todos</h2>

      {/* Filtro por categorias */}
      <div style={{ marginBottom: "20px" }}>
        <strong>Filtrar por Categoria:</strong>
        <button
          onClick={() => setSelectedCategory(null)} // Mostrar todas as categorias
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
            onClick={() => setSelectedCategory(category.id)} // Filtro pela categoria
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              backgroundColor: selectedCategory === category.id ? "#2196F3" : "#f1f1f1",
              color: selectedCategory === category.id ? "white" : "black",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Exibir nível e XP total acumulado */}
      <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
        Nível: {level} <br />
        Total XP: {totalXP} / {dailyGoal}
        <div
          style={{
            width: "100%",
            height: "20px",
            backgroundColor: "#ddd",
            borderRadius: "5px",
            overflow: "hidden",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              backgroundColor: progressPercentage >= 100 ? "#4CAF50" : "#2196F3",
              transition: "width 0.5s",
            }}
          ></div>
        </div>
      </div>

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
              {/* Nível de dificuldade e XP */}
              <span style={{ marginLeft: "10px", color: "#555" }}>
                {todo.difficulty && `XP: ${xpValues[todo.difficulty] || 0}`}
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
                  marginLeft: "10px",
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
              {/* Nível de dificuldade e XP */}
              <span style={{ marginLeft: "10px", color: "#555" }}>
                {todo.difficulty && `XP: ${xpValues[todo.difficulty] || 0}`}
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
                  marginLeft: "10px",
                }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Confetes ao atingir a meta */}
      {showConfetti && <Confetti />}
    </div>
  );
}

export default TodoList;