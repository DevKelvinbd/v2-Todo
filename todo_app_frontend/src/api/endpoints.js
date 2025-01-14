import axios from "axios"; // Importa o axios, uma biblioteca para realizar requisições HTTP.

const BASE_URL = "http://127.0.0.1:3000/api"; // URL base para todas as requisições à API.

// Funções relacionadas às tarefas (Todos)

// Obtém a lista de todas as tarefas
export const getTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todos`); // Faz uma requisição GET para "/todos".
  return response.data; // Retorna os dados da resposta (a lista de tarefas).
};

// Cria uma nova tarefa
export const createTodo = async (todoData) => {
  const response = await axios.post(`${BASE_URL}/todos`, todoData); // Faz uma requisição POST para "/todos" com os dados da nova tarefa.
  return response.data; // Retorna os dados da resposta (a tarefa criada).
};

// Atualiza uma tarefa existente
export const updateTodo = async (id, updatedData) => {
  const response = await axios.patch(`${BASE_URL}/todos/${id}`, updatedData); // Faz uma requisição PATCH para "/todos/:id" com os dados atualizados.
  return response.data; // Retorna os dados da resposta (a tarefa atualizada).
};

// Exclui uma tarefa pelo ID
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${BASE_URL}/todos/${id}`); // Faz uma requisição DELETE para "/todos/:id".
  return response.data; // Retorna os dados da resposta.
};

// Exclui todas as tarefas concluídas
export const deleteCompletedTodos = async () => {
  // Faz uma requisição DELETE para "/todos/completed" (rota para apagar todas as tarefas concluídas).
  await axios.delete(`${BASE_URL}/todos/completed`);
};

// Funções relacionadas às categorias

// Obtém a lista de todas as categorias
export const getCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`); // Faz uma requisição GET para "/categories".
  return response.data; // Retorna os dados da resposta (a lista de categorias).
};

// Cria uma nova categoria
export const createCategory = async (categoryData) => {
  const response = await axios.post(`${BASE_URL}/categories`, categoryData); // Faz uma requisição POST para "/categories" com os dados da nova categoria.
  return response.data; // Retorna os dados da resposta (a categoria criada).
};

// Exclui uma categoria pelo ID
export const deleteCategory = async (id) => {
  const response = await axios.delete(`${BASE_URL}/categories/${id}`); // Faz uma requisição DELETE para "/categories/:id".
  return response.data; // Retorna os dados da resposta.
};

// Funções relacionadas ao usuário

// Obtém os dados de um usuário pelo ID
export const getUser = async (id) => {
  const response = await axios.get(`${BASE_URL}/users/${id}`); // Faz uma requisição GET para "/users/:id".
  return response.data; // Retorna os dados da resposta (os dados do usuário).
};

// Atualiza os dados de um usuário pelo ID
export const updateUser = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/users/${id}`, updatedData); // Faz uma requisição PUT para "/users/:id" com os dados atualizados.
  return response.data; // Retorna os dados da resposta (os dados atualizados do usuário).
};