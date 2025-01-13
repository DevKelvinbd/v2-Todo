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
} from "./api/endpoints";
import styles from "./App.module.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({ xp: 0, level: 1 });

  // Função para carregar todos
  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  const deleteCompletedTodos = async () => {
    try {
      const completedTodos = todos.filter((todo) => todo.completed);
      for (const todo of completedTodos) {
        await deleteTodo(todo.id); // Chama a API para excluir cada tarefa
      }
      setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed)); // Atualiza o estado
    } catch (error) {
      console.error("Erro ao apagar tarefas concluídas:", error);
    }
  };

  // Função para carregar categorias
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  // Função para criar uma nova tarefa
  const handleCreateTodo = async (todoData) => {
    try {
      await createTodo(todoData);
      fetchTodos(); // Recarrega a lista
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  // Função para editar uma tarefa
  const handleEditTodo = async (updatedTodo) => {
    if (!updatedTodo?.id) {
      console.error("Erro: O ID da tarefa está indefinido.");
      return;
    }
    try {
      await updateTodo(updatedTodo.id, updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  // Função para excluir uma tarefa
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  // Função para criar uma categoria
  const handleCreateCategory = async (categoryData) => {
    try {
      await createCategory(categoryData);
      fetchCategories();
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  // Função para excluir uma categoria
  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchCategories();
  }, []);

  return (
    <div className={styles.containerApp}>
      <h1 className={styles.titleAplication}>Case Técnico: Todo List</h1>
      <AddCategory
        categories={categories}
        onCategoryCreated={handleCreateCategory}
        onCategoryDeleted={handleDeleteCategory}
      />
      <AddTodo categories={categories} onTodoCreated={handleCreateTodo} />
      <TodoList
        todos={todos}
        onEditTodo={handleEditTodo}
        onDeleteTodo={handleDeleteTodo}
        deleteCompletedTodos={deleteCompletedTodos} // Aqui está sendo passado corretamente
        categories={categories}
        setTodos={setTodos}
        user={user}
      />
    </div>
  );
}

export default App;
