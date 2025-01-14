import React, { useState, useEffect } from "react"; // Importa o React e hooks useState e useEffect.
import AddTodo from "./components/AddTodo/AddTodo"; // Importa o componente para adicionar uma tarefa.
import TodoList from "./components/TodoList/TodoList"; // Importa o componente para listar tarefas.
import AddCategory from "./components/AddCategory/AddCategory"; // Importa o componente para adicionar categorias.
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getCategories,
  createCategory,
  deleteCategory,
} from "./api/endpoints"; // Importa funções de API para interagir com o backend.
import styles from "./App.module.css"; // Importa os estilos do componente principal.

function App() {
  // Estado que armazena a lista de tarefas.
  const [todos, setTodos] = useState([]);
  
  // Estado que armazena a lista de categorias.
  const [categories, setCategories] = useState([]);
  
  // Estado que armazena informações do usuário (XP e nível).
  const [user, setUser] = useState({ xp: 0, level: 1 });

  // Função para carregar todas as tarefas do backend.
  const fetchTodos = async () => {
    try {
      const data = await getTodos(); // Chama a API para buscar todas as tarefas.
      setTodos(data); // Atualiza o estado com as tarefas obtidas.
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error); // Exibe o erro no console caso a API falhe.
    }
  };

  // Função para excluir todas as tarefas concluídas.
  const deleteCompletedTodos = async () => {
    try {
      const completedTodos = todos.filter((todo) => todo.completed); // Filtra as tarefas concluídas.
      for (const todo of completedTodos) {
        await deleteTodo(todo.id); // Chama a API para excluir cada tarefa individualmente.
      }
      setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed)); // Atualiza o estado removendo as concluídas.
    } catch (error) {
      console.error("Erro ao apagar tarefas concluídas:", error); // Exibe erro caso a exclusão falhe.
    }
  };

  // Função para carregar todas as categorias do backend.
  const fetchCategories = async () => {
    try {
      const data = await getCategories(); // Chama a API para buscar todas as categorias.
      setCategories(data); // Atualiza o estado com as categorias obtidas.
    } catch (error) {
      console.error("Erro ao carregar categorias:", error); // Exibe o erro no console caso a API falhe.
    }
  };

  // Função para criar uma nova tarefa.
  const handleCreateTodo = async (todoData) => {
    try {
      await createTodo(todoData); // Envia os dados da nova tarefa para a API.
      fetchTodos(); // Recarrega a lista de tarefas após a criação.
    } catch (error) {
      console.error("Erro ao criar tarefa:", error); // Exibe erro caso a criação falhe.
    }
  };

  // Função para editar uma tarefa existente.
  const handleEditTodo = async (updatedTodo) => {
    if (!updatedTodo?.id) {
      console.error("Erro: O ID da tarefa está indefinido."); // Valida se o ID da tarefa existe.
      return;
    }
    try {
      await updateTodo(updatedTodo.id, updatedTodo); // Atualiza a tarefa no backend.
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo // Substitui a tarefa atualizada no estado.
        )
      );
    } catch (error) {
      console.error("Erro ao editar tarefa:", error); // Exibe erro caso a atualização falhe.
    }
  };

  // Função para excluir uma tarefa.
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id); // Chama a API para excluir a tarefa pelo ID.
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Remove a tarefa do estado.
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error); // Exibe erro caso a exclusão falhe.
    }
  };

  // Função para criar uma nova categoria.
  const handleCreateCategory = async (categoryData) => {
    try {
      await createCategory(categoryData); // Envia os dados da nova categoria para a API.
      fetchCategories(); // Recarrega a lista de categorias após a criação.
    } catch (error) {
      console.error("Erro ao criar categoria:", error); // Exibe erro caso a criação falhe.
    }
  };

  // Função para excluir uma categoria.
  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId); // Chama a API para excluir a categoria pelo ID.
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId) // Remove a categoria do estado.
      );
    } catch (error) {
      console.error("Erro ao excluir categoria:", error); // Exibe erro caso a exclusão falhe.
    }
  };

  // useEffect para carregar as tarefas e categorias ao montar o componente.
  useEffect(() => {
    fetchTodos(); // Carrega as tarefas.
    fetchCategories(); // Carrega as categorias.
  }, []); // O array vazio indica que este efeito é executado apenas uma vez.

  // Renderiza a aplicação.
  return (
    <div className={styles.containerApp}>
      <h1 className={styles.titleAplication}>Case Técnico: Todo List</h1> {/* Título da aplicação */}
      <AddCategory
        categories={categories} // Passa as categorias para o componente.
        onCategoryCreated={handleCreateCategory} // Callback para criar categoria.
        onCategoryDeleted={handleDeleteCategory} // Callback para excluir categoria.
      />
      <AddTodo
        categories={categories} // Passa as categorias para o componente de adicionar tarefas.
        onTodoCreated={handleCreateTodo} // Callback para criar tarefa.
      />
      <TodoList
        todos={todos} // Passa as tarefas para o componente de lista.
        onEditTodo={handleEditTodo} // Callback para editar tarefa.
        onDeleteTodo={handleDeleteTodo} // Callback para excluir tarefa.
        deleteCompletedTodos={deleteCompletedTodos} // Callback para excluir todas as tarefas concluídas.
        categories={categories} // Passa as categorias.
        setTodos={setTodos} // Passa o setter do estado de tarefas.
        user={user} // Passa os dados do usuário.
      />
    </div>
  );
}

export default App; // Exporta o componente principal.