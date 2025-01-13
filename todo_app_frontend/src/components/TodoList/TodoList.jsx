import React, { useState, useEffect } from "react";
import Confetti from "react-confetti"; // Biblioteca para efeitos de confete
import styles from "./TodoList.module.css"; // Estilos específicos para o componente
import { FaTrashRestore } from "react-icons/fa"; // Ícone de restauração de tarefa concluída
import { CustomConfirmModal } from "../CustomConfirmModal/CustomConfirmModal";

// Modal de Confirmação Customizada


// Componente principal TodoList
function TodoList({
  todos, // Lista de tarefas
  onEditTodo, // Função para editar uma tarefa
  deleteCompletedTodos, // Função para excluir todas as tarefas concluídas
  setTodos, // Função para atualizar a lista de tarefas
  user, // Informações do usuário (XP, nível)
  categories, // Lista de categorias
}) {
  const xpValues = { easy: 25, medium: 45, hard: 70 }; // XP por dificuldade
  const baseGoal = 50; // Meta base de XP

  // Estados do componente
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewedTodo, setViewedTodo] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [totalXP, setTotalXP] = useState(user?.xp || 0);
  const [level, setLevel] = useState(user?.level || 1);
  const [showModal, setShowModal] = useState(false); // Controle do modal

  // Meta diária baseada no nível
  const dailyGoal = Math.ceil(baseGoal * (1 + (level - 1) * 0.02));
  const progressPercentage = Math.min((totalXP / dailyGoal) * 100, 100);

  // Verifica se o usuário atingiu a meta diária
  useEffect(() => {
    if (totalXP >= dailyGoal) {
      setShowConfetti(true); // Exibe confetes
      setShowModal(true); // Exibe o modal
    }
  }, [totalXP, dailyGoal]);

  // Confirmação: Incrementa nível e exclui tarefas concluídas
  const handleConfirmDelete = async () => {
    setShowModal(false);
    setLevel((prevLevel) => prevLevel + 1);
    setTotalXP((prevXP) => prevXP - dailyGoal);
    await deleteCompletedTodos(); // Exclui tarefas concluídas
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // Cancelamento: Incrementa nível e mantém as tarefas concluídas
  const handleCancelDelete = () => {
    setShowModal(false);
    setLevel((prevLevel) => prevLevel + 1);
    setTotalXP((prevXP) => prevXP - dailyGoal);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // Atualiza o estado de conclusão de uma tarefa
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

  // Filtra tarefas por categoria
  const filteredTodos = selectedCategory
    ? todos.filter((todo) => todo.category?.id === selectedCategory)
    : todos;

  const pendingTodos = filteredTodos.filter((todo) => !todo.completed);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);

  // Renderiza listas de tarefas
  const renderTodoList = (todos, title, isCompleted) => (
    <>
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
                  isCompleted ? styles.inputCheckboxCheck : styles.inputCheckbox
                }
              />
              <span
                className={isCompleted ? styles.completeTodo : styles.textTodo}
                onClick={() => setViewedTodo(todo)}
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
                onClick={() => onEditTodo(todo.id)}
                className={styles.deleteTodo}
              >
                <FaTrashRestore />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
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

      {/* Listas de Tarefas */}
      {renderTodoList(pendingTodos, "Tarefas para fazer", false)}
      {renderTodoList(completedTodos, "Tarefas concluídas", true)}

      {/* Modal de Confirmação */}
      {showModal && (
        <CustomConfirmModal
          message="Parabéns! Você subiu de nível! Deseja apagar as tarefas concluídas?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Confetes */}
      {showConfetti && <Confetti />}
    </div>
  );
}

export default TodoList;
