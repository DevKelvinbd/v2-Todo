import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import styles from "./TodoList.module.css";
import { FaTrashRestore } from "react-icons/fa";

function TodoList({
  todos,
  onToggleCompleted,
  onDeleteTodo,
  onEditTodo,
  categories,
  user,
  deleteCompletedTodos,
  fetchTodos,
  setTodos, // Certifique-se de que está incluído aqui
}) {
  // Valores de XP por dificuldade
  const xpValues = { easy: 25, medium: 45, hard: 70 };

  // Estados
  const [selectedCategory, setSelectedCategory] = useState(null); // Filtro por categoria
  const [totalXP, setTotalXP] = useState(user?.xp || 0); // XP total acumulado do usuário
  const [level, setLevel] = useState(user?.level || 1); // Nível do usuário
  const [showConfetti, setShowConfetti] = useState(false); // Controle dos confetes
  const [viewedTodo, setViewedTodo] = useState(null); // Estado para exibir os detalhes da tarefa
  const [newDescription, setNewDescription] = useState(""); // Estado para a nova descrição
  const [showConfirmation, setShowConfirmation] = useState(false);

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
  }, [totalXP, dailyGoal, level, deleteCompletedTodos]);

  // Filtrar tarefas com base na categoria selecionada
  const filteredTodos = selectedCategory
    ? todos.filter((todo) => todo.category?.id === selectedCategory)
    : todos;

  // Separar tarefas pendentes e concluídas
  const pendingTodos = filteredTodos.filter((todo) => !todo.completed);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);

  // Atualizar XP ao completar tarefa
  const handleToggleCompleted = async (id, newCompleted, difficulty) => {
    try {
      // Encontre a tarefa correspondente
      const updatedTodo = todos.find((todo) => todo.id === id);
      if (!updatedTodo) return;

      // Atualize a tarefa no backend
      await onEditTodo({ ...updatedTodo, completed: newCompleted });

      // Atualize o estado local para refletir a mudança
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: newCompleted } : todo
        )
      );

      // Atualize o XP do usuário
      if (newCompleted) {
        const xpGained = xpValues[difficulty] || 0;
        setTotalXP((prevXP) => prevXP + xpGained);
      } else {
        const xpLost = xpValues[difficulty] || 0;
        setTotalXP((prevXP) => prevXP - xpLost);
      }
    } catch (error) {
      console.error("Erro ao atualizar estado de concluído:", error);
    }
  };

  // Visualizar detalhes da tarefa
  const handleViewTodo = (todo) => {
    setViewedTodo(todo);
    setNewDescription(todo.description || "");
  };

  // Fechar a visualização
  const closeViewedTodo = () => {
    setViewedTodo(null);
  };

  // Salvar a nova descrição
  const handleSaveDescription = () => {
    if (viewedTodo) {
      const updatedTodo = { ...viewedTodo, description: newDescription };
      onEditTodo(updatedTodo); // Atualiza a tarefa no banco de dados ou na lista de tarefas
      setViewedTodo(updatedTodo); // Atualiza localmente
      setShowConfirmation(true); // Exibe a mensagem de confirmação

      // Oculta a mensagem após 3 segundos
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    }
  };

  return (
    <div className={styles.containerTodo}>
      <h2 className={styles.titleListTodo}>Lista de Tarefas</h2>
      <div className={styles.divFilterCategory}>
        <p className={styles.subtitleFiltrarCategoria}>
          Filtrar por Categoria:
        </p>
        <button
          className={styles.filterAll}
          onClick={() => setSelectedCategory(null)} // Mostrar todas as categorias
          style={{
            backgroundColor: selectedCategory === null ? "#12143c" : "#f1f1f1",
            color: selectedCategory === null ? "#7DBDEB" : "black",
          }}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            className={styles.filterNewCategory}
            key={category.id}
            onClick={() => setSelectedCategory(category.id)} // Filtro pela categoria
            style={{
              backgroundColor:
                selectedCategory === category.id ? "#12143c" : "#f1f1f1",
              color: selectedCategory === category.id ? "#7DBDEB" : "black",
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Exibir barra de progresso */}
      <div className={styles.divSectionBar}>
        <p className={styles.textNivel}>Nível: {level}</p>
        <p className={styles.textNivel}>
          Total XP: {totalXP} / {dailyGoal}
        </p>
        <div className={styles.divContainerBar}>
          <div
            className={styles.progressBar}
            style={{
              width: `${progressPercentage}%`,
              backgroundColor:
                progressPercentage >= 100 ? "#4CAF50" : "#7DBDEB",
              transition: "width 0.5s",
            }}
          />
        </div>
      </div>

      {/* Tarefas pendentes */}
      <h3 className={styles.textTarefas}>Tarefas para fazer</h3>
      {pendingTodos.length === 0 ? (
        <p>Sem tarefas pendentes!</p>
      ) : (
        <ul className={styles.stylesUl}>
          {pendingTodos.map((todo) => (
            <li key={todo.id} className={styles.liPendingTodos}>
              <input
                className={styles.inputCheckbox}
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  handleToggleCompleted(
                    todo.id,
                    !todo.completed,
                    todo.difficulty
                  )
                }
              />

              <span
                className={styles.textTodo}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => handleViewTodo(todo)} // Exibir detalhes ao clicar
              >
                {todo.todo_name}{" "}
                {todo.category && (
                  <em className={styles.emTaskCategory}>
                    ({todo.category.name})
                  </em>
                )}
              </span>
              <span className={styles.infoDificult}>
                {todo.difficulty && `XP: ${xpValues[todo.difficulty] || 0}`}
              </span>
              <button
                className={styles.buttonDeleteTodo}
                onClick={() => onDeleteTodo(todo.id)}
              >
                <FaTrashRestore />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Tarefas concluídas */}
      <h3 className={styles.textTarefas}>Tarefas concluídas</h3>
      {completedTodos.length === 0 ? (
        <p>Sem tarefas concluídas!</p>
      ) : (
        <ul className={styles.stylesUl}>
          {completedTodos.map((todo) => (
            <li className={styles.liCompletedTodos} key={todo.id}>
              <input
                className={styles.inputCheckboxCheck}
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  handleToggleCompleted(
                    todo.id,
                    !todo.completed,
                    todo.difficulty
                  )
                }
              />
              <span
                className={styles.completeTodo}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => handleViewTodo(todo)} // Exibir detalhes ao clicar
              >
                {todo.todo_name}{" "}
                {todo.category && (
                  <em className={styles.emCompletedTodo}>
                    ({todo.category.name})
                  </em>
                )}
              </span>
              <span className={styles.spanDifXp2}>
                {todo.difficulty && `XP: ${xpValues[todo.difficulty] || 0}`}
              </span>
              <button
                className={styles.deleteTodo}
                onClick={() => onDeleteTodo(todo.id)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}

      {viewedTodo && (
        <div className={styles.detailsOverlay}>
          <div className={styles.detailsCard}>
            <h3>Detalhes da Tarefa</h3>
            <p>
              <strong>Nome:</strong> {viewedTodo.todo_name}
            </p>
            <p>
              <strong>Descrição:</strong>
            </p>
            <textarea
              className={styles.descriptionInput}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <p>
              <strong>Dificuldade:</strong>{" "}
              {viewedTodo.difficulty || "Não especificada"}
            </p>
            <button
              className={styles.saveDescriptionButton}
              onClick={handleSaveDescription}
            >
              Salvar
            </button>
            <button
              className={styles.closeDetailsButton}
              onClick={closeViewedTodo}
            >
              Fechar
            </button>

            {/* Mensagem de confirmação */}
            {showConfirmation && (
              <p className={styles.confirmationMessage}>
                Descrição salva com sucesso!
              </p>
            )}
          </div>
        </div>
      )}

      {showConfetti && <Confetti />}
    </div>
  );
}

export default TodoList;