import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import styles from "./TodoList.module.css";
import { FaTrashRestore } from "react-icons/fa";
import { CustomConfirmModal } from "../CustomConfirmModal/CustomConfirmModal";

function TodoList({
  todos,
  onEditTodo,
  onDeleteTodo,
  deleteCompletedTodos,
  setTodos,
  user,
  categories,
}) {
  const xpValues = { easy: 25, medium: 45, hard: 70 }; // XP por dificuldade
  const baseGoal = 200; // Meta base de XP

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewedTodo, setViewedTodo] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [totalXP, setTotalXP] = useState(user?.xp || 0);
  const [level, setLevel] = useState(user?.level || 1);
  const [showModal, setShowModal] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

  const dailyGoal = Math.ceil(baseGoal * (1 + (level - 1) * 0.02));
  const progressPercentage = Math.min((totalXP / dailyGoal) * 100, 100);

  useEffect(() => {
    if (totalXP >= dailyGoal) {
      setShowModal(true);
    }
  }, [totalXP, dailyGoal]);

  const handleConfirmLevelUp = async () => {
    setShowModal(false);
    setLevel((prevLevel) => prevLevel + 1);
    setTotalXP((prevXP) => prevXP - dailyGoal);
  
    if (deleteCompletedTodos) {
      await deleteCompletedTodos();
    }
  
    // Exibir confetes
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const handleCancelLevelUp = () => {
    setShowModal(false);
    setLevel((prevLevel) => prevLevel + 1);
    setTotalXP((prevXP) => prevXP - dailyGoal);
  
    // Exibir confetes mesmo no cancelamento
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const handleToggleCompleted = async (id, newCompleted, difficulty) => {
    try {
      const updatedTodo = todos.find((todo) => todo.id === id);
      if (!updatedTodo) return;

      await onEditTodo({ ...updatedTodo, completed: newCompleted });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: newCompleted } : todo
        )
      );

      const xpChange = xpValues[difficulty] || 0;
      setTotalXP((prevXP) => prevXP + (newCompleted ? xpChange : -xpChange));
    } catch (error) {
      console.error("Erro ao atualizar estado:", error);
    }
  };

  const filteredTodos = selectedCategory
    ? todos.filter((todo) => todo.category?.id === selectedCategory)
    : todos;

  const pendingTodos = filteredTodos.filter((todo) => !todo.completed);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);

  const handleViewDetails = (todo) => {
    setViewedTodo(todo);
    setEditedDescription(todo.description || "");
  };

  const handleCloseDetails = () => {
    setViewedTodo(null);
  };

  const handleSaveDescription = async () => {
    if (!viewedTodo) return;

    const updatedTodo = { ...viewedTodo, description: editedDescription };
    try {
      await onEditTodo(updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
      setViewedTodo(updatedTodo);

      // Exibe a mensagem de confirmação
      setShowConfirmationMessage(true);
      setTimeout(() => setShowConfirmationMessage(false), 3000); // Oculta após 3 segundos
    } catch (error) {
      console.error("Erro ao salvar descrição:", error);
    }
  };

  const renderTodoList = (todos, title, isCompleted) => (
    <div className={styles.divRenderTodo}>
      <h3 className={styles.textTarefas}>{title}</h3>
      {todos.length === 0 ? (
        <p>Sem tarefas {isCompleted ? "concluídas" : "pendentes"}!</p>
      ) : (
        <ul className={styles.stylesUl}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={
                isCompleted ? styles.liCompletedTodos : styles.liPendingTodos
              }
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
                className={
                  isCompleted
                    ? styles.inputCheckboxCheck
                    : styles.inputCheckbox
                }
              />
              <span
                className={
                  isCompleted ? styles.completeTodo : styles.textTodo
                }
                onClick={() => handleViewDetails(todo)}
                style={{ cursor: "pointer" }}
              >
                {todo.todo_name}
                {todo.category && (
                  <em className={styles.emTaskCategory}>
                    ({todo.category.name})
                  </em>
                )}
              </span>
              {todo.difficulty && (
                <span className={styles.infoDificult}>
                  XP: {xpValues[todo.difficulty]}
                </span>
              )}
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className={styles.deleteTodo}
              >
                <FaTrashRestore />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className={styles.containerTodo}>
      <h2 className={styles.titleListTodo}>Lista de Tarefas</h2>
      <div className={styles.divFilterCategory}>
        <p className={styles.subtitleFiltrarCategoria}>
          Filtrar por Categoria:
        </p>
        <button
          onClick={() => setSelectedCategory(null)}
          className={styles.filterAll}
          style={{
            backgroundColor: selectedCategory === null ? "#12143c" : "#f1f1f1",
            color: selectedCategory === null ? "#7DBDEB" : "black",
          }}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={styles.filterNewCategory}
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

      {renderTodoList(pendingTodos, "Tarefas para fazer", false)}
      {renderTodoList(completedTodos, "Tarefas concluídas", true)}

      {showModal && (
        <CustomConfirmModal
          message="Parabéns! Você subiu de nível! Deseja apagar as tarefas concluídas?"
          onConfirm={handleConfirmLevelUp}
          onCancel={handleCancelLevelUp}
        />
      )}

      {showConfetti && <Confetti style={{width: "100%"}} />}

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
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
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
              onClick={handleCloseDetails}
            >
              Fechar
            </button>
            {showConfirmationMessage && (
              <p className={styles.confirmationMessage}>
                Descrição salva com sucesso!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
