import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

function TodoList({
  todos,
  onToggleCompleted,
  onDeleteTodo,
  categories,
  user,
  deleteCompletedTodos,
  fetchTodos,
}) {
  // Valores de XP por dificuldade
  const xpValues = { easy: 25, medium: 45, hard: 70 };

  // Estados
  const [selectedCategory, setSelectedCategory] = useState(null); // Filtro por categoria
  const [totalXP, setTotalXP] = useState(user?.xp || 0); // XP total acumulado do usuário
  const [level, setLevel] = useState(user?.level || 1); // Nível do usuário
  const [showConfetti, setShowConfetti] = useState(false); // Controle dos confetes

  // Calcular meta diária com base no nível
  const baseGoal = 500; // Meta base
  const dailyGoal = Math.ceil(baseGoal * (1 + (level - 1) * 0.02)); // Aumenta 2% por nível

  // Calcular porcentagem de progresso
  const progressPercentage = Math.min((totalXP / dailyGoal) * 100, 100);

  // Subir de nível e perguntar se deseja apagar tarefas concluídas
  useEffect(() => {
    const handleLevelUp = async () => {
      setShowConfetti(true);

      // Subir de nível
      const remainingXP = totalXP - dailyGoal;
      const newLevel = level + 1;

      // Atualiza o estado local
      setLevel(newLevel);
      setTotalXP(remainingXP);

      // Confirmação para apagar tarefas concluídas
      const shouldDelete = window.confirm(
        "Parabéns! Você subiu de nível! Deseja apagar as tarefas concluídas para continuar?"
      );

      if (shouldDelete) {
        try {
          await deleteCompletedTodos(); // Usa a função passada como prop
        } catch (error) {
          console.error("Erro ao apagar tarefas concluídas:", error);
        }
      }

      setTimeout(() => setShowConfetti(false), 4000); // Esconde os confetes após 4 segundos
    };

    if (totalXP >= dailyGoal) {
      handleLevelUp();
    }
  }, [totalXP, dailyGoal, level, deleteCompletedTodos, fetchTodos]);

  // Filtrar tarefas com base na categoria selecionada
  const filteredTodos = selectedCategory
    ? todos.filter((todo) => todo.category?.id === selectedCategory)
    : todos;

  // Separar tarefas pendentes e concluídas
  const pendingTodos = filteredTodos.filter((todo) => !todo.completed);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);

  // Atualizar XP ao completar tarefa
  const handleToggleCompleted = (id, newCompleted, difficulty) => {
    onToggleCompleted(id, newCompleted, difficulty);
    if (newCompleted) {
      const xpGained = xpValues[difficulty] || 0;
      setTotalXP((prevXP) => prevXP + xpGained);
    }
  };

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

      {/* Exibir barra de progresso */}
      <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
        <p>Nível: {level}</p>
        <p>
          Total XP: {totalXP} / {dailyGoal}
        </p>
        <div
          style={{
            width: "100%",
            height: "20px",
            backgroundColor: "#ddd",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              backgroundColor:
                progressPercentage >= 100 ? "#4CAF50" : "#2196F3",
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
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  handleToggleCompleted(
                    todo.id,
                    !todo.completed,
                    todo.difficulty
                  )
                }
                style={{ marginRight: "10px" }}
              />
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
              <span style={{ marginLeft: "10px", color: "#555" }}>
                {todo.difficulty && `XP: ${xpValues[todo.difficulty] || 0}`}
              </span>
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
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  handleToggleCompleted(
                    todo.id,
                    !todo.completed,
                    todo.difficulty
                  )
                }
                style={{ marginRight: "10px" }}
              />
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
              <span style={{ marginLeft: "10px", color: "#555" }}>
                {todo.difficulty && `XP: ${xpValues[todo.difficulty] || 0}`}
              </span>
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

      {showConfetti && <Confetti />}
    </div>
  );
}

export default TodoList;
