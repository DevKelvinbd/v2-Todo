import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import AddCategory from "./components/AddCategory";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getCategories,
  createCategory,
  deleteCategory, // Adicione esta linha
} from "./api/endpoints";

function App() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);

  // Função para carregar todos do back-end
  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  // Função para carregar categorias do back-end
  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
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

  // Função para criar uma nova categoria e recarregar a lista
  const handleCreateCategory = async (categoryData) => {
    try {
      await createCategory(categoryData); // Cria a categoria no back-end
      await fetchCategories(); // Recarrega a lista de categorias
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  // Função para alternar o estado de concluído
  const handleToggleCompleted = async (id, newCompleted) => {
    await updateTodo(id, { completed: newCompleted });
    await fetchTodos();
  };

  // Função para excluir um todo
  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    await fetchTodos();
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id); // Chama o endpoint para excluir a categoria
      await fetchCategories(); // Atualiza a lista de categorias após a exclusão
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Meu App de Tarefas</h1>
      <AddCategory
        categories={categories}
        onCategoryCreated={handleCreateCategory}
        onCategoryDeleted={handleDeleteCategory}
      />
      <AddTodo categories={categories} onTodoCreated={handleCreateTodo} />
      <TodoList
        todos={todos}
        onToggleCompleted={handleToggleCompleted}
        onDeleteTodo={handleDeleteTodo}
        categories={categories} // Passando as categorias
      />
    </div>
  );
}

export default App;
