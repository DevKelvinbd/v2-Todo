import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000/api";

// Tarefas (Todos)
export const getTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todos`);
  return response.data;
};

export const createTodo = async (todoData) => {
  const response = await axios.post(`${BASE_URL}/todos`, todoData);
  return response.data;
};

export const updateTodo = async (id, updatedData) => {
  const response = await axios.patch(`${BASE_URL}/todos/${id}`, updatedData);
  return response.data;
};


export const deleteTodo = async (id) => {
  const response = await axios.delete(`${BASE_URL}/todos/${id}`);
  return response.data;
};

export const deleteCompletedTodos = async () => {
  // Remove todas as tarefas concluídas
  await axios.delete(`${BASE_URL}/todos/completed`);
};

// Categorias
export const getCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await axios.post(`${BASE_URL}/categories`, categoryData);
  return response.data; // Retorna a nova categoria criada
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${BASE_URL}/categories/${id}`);
  return response.data;
};

// Usuário
export const getUser = async (id) => {
  const response = await axios.get(`${BASE_URL}/users/${id}`);
  return response.data;
};

export const updateUser = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/users/${id}`, updatedData);
  return response.data;
};