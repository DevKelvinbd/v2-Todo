import React, { useState, useEffect } from "react"; // Importa React e os hooks useState e useEffect.
import Confetti from "react-confetti"; // Importa o componente para exibir confetes.
import styles from "./TodoList.module.css"; // Importa os estilos do componente.
import { FaTrashRestore } from "react-icons/fa"; // Importa o ícone de "restaurar" da biblioteca react-icons.
import { CustomConfirmModal } from "../CustomConfirmModal/CustomConfirmModal"; // Importa um modal customizado para confirmação.

function TodoList({
  todos, // Lista de tarefas.
  onEditTodo, // Callback para editar uma tarefa.
  onDeleteTodo, // Callback para excluir uma tarefa.
  deleteCompletedTodos, // Callback para excluir todas as tarefas concluídas.
  setTodos, // Função para atualizar o estado das tarefas.
  user, // Dados do usuário (XP e nível).
  categories, // Lista de categorias.
}) {
  const xpValues = { easy: 25, medium: 45, hard: 70 }; // Valores de XP por dificuldade.
  const baseGoal = 200; // Meta base de XP para subir de nível.

  // Estados locais do componente.
  const [selectedCategory, setSelectedCategory] = useState(null); // Categoria selecionada para filtragem.
  const [viewedTodo, setViewedTodo] = useState(null); // Tarefa sendo visualizada em detalhes.
  const [showConfetti, setShowConfetti] = useState(false); // Controle para exibir confetes.
  const [totalXP, setTotalXP] = useState(user?.xp || 0); // XP total do usuário.
  const [level, setLevel] = useState(user?.level || 1); // Nível atual do usuário.
  const [showModal, setShowModal] = useState(false); // Controle para exibir o modal de confirmação.
  const [editedDescription, setEditedDescription] = useState(""); // Descrição editada da tarefa.
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false); // Mensagem de confirmação ao salvar descrição.

  const dailyGoal = Math.ceil(baseGoal * (1 + (level - 1) * 0.02)); // Calcula a meta diária de XP com base no nível do usuário.
  const progressPercentage = Math.min((totalXP / dailyGoal) * 100, 100); // Calcula a porcentagem de progresso na meta diária.

  // useEffect para exibir o modal de nível quando o XP alcança ou excede a meta diária.
  useEffect(() => {
    if (totalXP >= dailyGoal) {
      setShowModal(true);
    }
  }, [totalXP, dailyGoal]);

  // Função chamada ao confirmar a subida de nível.
  const handleConfirmLevelUp = async () => {
    setShowModal(false); // Fecha o modal.
    setLevel((prevLevel) => prevLevel + 1); // Incrementa o nível.
    setTotalXP((prevXP) => prevXP - dailyGoal); // Reduz o XP pela meta atingida.

    if (deleteCompletedTodos) {
      await deleteCompletedTodos(); // Exclui as tarefas concluídas se o callback estiver disponível.
    }

    // Exibe os confetes por 4 segundos.
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // Função chamada ao cancelar a subida de nível (comportamento similar ao confirmar).
  const handleCancelLevelUp = () => {
    setShowModal(false); // Fecha o modal.
    setLevel((prevLevel) => prevLevel + 1); // Incrementa o nível.
    setTotalXP((prevXP) => prevXP - dailyGoal); // Reduz o XP pela meta atingida.

    // Exibe os confetes mesmo no cancelamento.
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // Função para alternar o estado de concluído de uma tarefa.
  const handleToggleCompleted = async (id, newCompleted, difficulty) => {
    try {
      const updatedTodo = todos.find((todo) => todo.id === id); // Encontra a tarefa pelo ID.
      if (!updatedTodo) return; // Retorna se a tarefa não existir.

      await onEditTodo({ ...updatedTodo, completed: newCompleted }); // Atualiza o estado no backend.
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: newCompleted } : todo // Atualiza o estado localmente.
        )
      );

      const xpChange = xpValues[difficulty] || 0; // Calcula a mudança no XP com base na dificuldade.
      setTotalXP((prevXP) => prevXP + (newCompleted ? xpChange : -xpChange)); // Ajusta o XP total.
    } catch (error) {
      console.error("Erro ao atualizar estado:", error); // Loga erro em caso de falha.
    }
  };

  // Filtra as tarefas com base na categoria selecionada.
  const filteredTodos = selectedCategory
    ? todos.filter((todo) => todo.category?.id === selectedCategory)
    : todos;

  // Divide as tarefas em pendentes e concluídas.
  const pendingTodos = filteredTodos.filter((todo) => !todo.completed);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);

  // Função para exibir os detalhes de uma tarefa.
  const handleViewDetails = (todo) => {
    setViewedTodo(todo);
    setEditedDescription(todo.description || ""); // Inicializa a descrição para edição.
  };

  // Fecha a visualização de detalhes.
  const handleCloseDetails = () => {
    setViewedTodo(null);
  };

  // Salva a descrição editada de uma tarefa.
  const handleSaveDescription = async () => {
    if (!viewedTodo) return; // Retorna se não houver tarefa visualizada.

    const updatedTodo = { ...viewedTodo, description: editedDescription }; // Atualiza os dados da tarefa.
    try {
      await onEditTodo(updatedTodo); // Atualiza no backend.
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo // Atualiza no estado local.
        )
      );
      setViewedTodo(updatedTodo);

      // Exibe a mensagem de confirmação por 3 segundos.
      setShowConfirmationMessage(true);
      setTimeout(() => setShowConfirmationMessage(false), 3000);
    } catch (error) {
      console.error("Erro ao salvar descrição:", error); // Loga erro em caso de falha.
    }
  };

  // Renderiza a lista de tarefas (pendentes ou concluídas).
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

  // Renderização do componente principal.
  return (
    <div className={styles.containerTodo}>
      <h2 className={styles.titleListTodo}>Lista de Tarefas</h2>

      {/* Filtro por categoria */}
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

      {/* Barra de progresso */}
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

      {/* Listas de tarefas */}
      {renderTodoList(pendingTodos, "Tarefas para fazer", false)}
      {renderTodoList(completedTodos, "Tarefas concluídas", true)}

      {/* Modal de confirmação */}
      {showModal && (
        <CustomConfirmModal
          message="Parabéns! Você subiu de nível! Deseja apagar as tarefas concluídas?"
          onConfirm={handleConfirmLevelUp}
          onCancel={handleCancelLevelUp}
        />
      )}

      {/* Confetes */}
      {showConfetti && <Confetti style={{ width: "100%" }} />}

      {/* Detalhes da tarefa */}
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

export default TodoList; // Exporta o componente.