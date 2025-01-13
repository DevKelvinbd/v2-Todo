import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import AddCategory from "./components/AddCategory/AddCategory";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getCategories,
  createCategory,
  deleteCategory,
  getUser,
} from "./api/endpoints";
import styles from "./App.module.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({ xp: 0, level: 1 });
  const [currentTodo, setCurrentTodo] = useState(null); // Tarefa em exibição
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const [isEditing, setIsEditing] = useState(false); // Controle do modo de edição
  const [viewedTodo, setViewedTodo] = useState(null); // Estado para a tarefa sendo visualizada

  // Função para carregar todos do back-end
  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  // Função para criar uma nova categoria e recarregar a lista
  const handleCreateCategory = async (categoryData) => {
    try {
      await createCategory(categoryData); // Cria a categoria no back-end
      await fetchCategories(); // Recarrega a lista de categorias
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  // Função para carregar categorias do back-end
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  // Carregar todos e categorias ao montar o componente
  useEffect(() => {
    fetchTodos();
    fetchCategories();
  }, []);

  // Função para criar um novo todo e recarregar a lista
  const handleCreateTodo = async (todoData) => {
    try {
      await createTodo(todoData); // Cria o todo no back-end
      await fetchTodos(); // Recarrega a lista de todos
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  // Função para alternar o estado de concluído
  const handleToggleCompleted = (id, newCompleted) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: newCompleted } : todo
      )
    );
  };

  const handleViewTodo = (todo) => {
    setViewedTodo(todo); // Define a tarefa atualmente visualizada
    setIsModalOpen(true); // Abre o modal
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId); // Chama a API para excluir a categoria
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      ); // Remove a categoria do estado
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
    }
  };

  // Função para salvar a tarefa editada
  const handleEditTodo = async (updatedTodo) => {
    try {
      // Atualiza a tarefa no backend
      await updateTodo(updatedTodo.id, updatedTodo);

      // Atualiza o estado local
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Fecha o modal
    setViewedTodo(null); // Reseta a tarefa visualizada
  };

  const handleEditDescription = async (updatedTodo) => {
    try {
      await updateTodo(updatedTodo.id, updatedTodo); // Atualiza no banco
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error("Erro ao editar a descrição da tarefa:", error);
    }
  };

  const handleSaveDescription = () => {
    if (viewedTodo) {
      const updatedTodo = { ...viewedTodo, description: newDescription };
      onEditTodo(updatedTodo); // Salva a edição
      setViewedTodo(updatedTodo); // Atualiza localmente

      // Exibe a mensagem de confirmação
      setShowConfirmation(true);

      // Oculta a mensagem após 3 segundos
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id); // Chama a API para excluir a tarefa
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Atualiza o estado local
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const deleteCompletedTodos = async () => {
    try {
      const completedTodos = todos.filter((todo) => todo.completed);
      for (const todo of completedTodos) {
        await deleteTodo(todo.id); // Exclui cada tarefa concluída
      }
      setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed)); // Atualiza o estado local
    } catch (error) {
      console.error("Erro ao apagar tarefas concluídas:", error);
    }
  };

  return (
    <div className={styles.containerApp}>
      <h1 className={styles.titleAplication}>Case Técnico: Todo List</h1>
      <AddCategory
        categories={categories}
        updateTodo={updateTodo} // Certifique-se de que isso está presente
        onCategoryCreated={handleCreateCategory}
        onCategoryDeleted={handleDeleteCategory} // Passando a função aqui
      />
      <AddTodo categories={categories} onTodoCreated={handleCreateTodo} />
      <TodoList
        todos={todos}
        viewedTodo={viewedTodo} // Passa a tarefa atualmente visualizada
        onToggleCompleted={handleToggleCompleted}
        onViewTodo={handleViewTodo}
        onEditTodo={handleEditTodo} // Mantém a função geral de edição
        onDeleteTodo={handleDeleteTodo} // Função para excluir
        onEditDescription={handleEditDescription} // Adiciona a prop de edição de descrição
        deleteCompletedTodos={deleteCompletedTodos} // Deleta os TOdos ao passar de nível
        categories={categories}
        user={user}
        setTodos={setTodos}
      />

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
              value={viewedTodo.description || ""}
              onChange={(e) =>
                setViewedTodo({ ...viewedTodo, description: e.target.value })
              }
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
              onClick={handleCloseModal}
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
    </div>
  );
}

export default App;
