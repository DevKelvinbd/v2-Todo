import React, { useState } from "react";

function AddTodo({ categories, onTodoCreated }) {
  const [todoName, setTodoName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy"); // Nível de dificuldade padrão

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!todoName.trim()) {
      alert("O nome da tarefa não pode estar vazio!");
      return;
    }

    if (!selectedCategory) {
      alert("Por favor, selecione uma categoria!");
      return;
    }

    // Passa o novo todo para a função recebida via props
    await onTodoCreated({
      todo_name: todoName,
      completed: false, // Define como pendente ao criar
      category_id: selectedCategory, // Adiciona a categoria selecionada
      difficulty, // Define o nível de dificuldade
    });

    // Limpa os inputs
    setTodoName("");
    setSelectedCategory("");
    setDifficulty("easy");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      {/* Nome da tarefa */}
      <input
        type="text"
        placeholder="Digite o nome da tarefa"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginRight: "10px",
        }}
      />

      {/* Dropdown de categorias */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginRight: "10px",
        }}
      >
        <option value="">Selecione uma categoria</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Dropdown de dificuldade */}
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginRight: "10px",
        }}
      >
        <option value="easy">Fácil</option>
        <option value="medium">Média</option>
        <option value="hard">Difícil</option>
      </select>

      {/* Botão de adicionar */}
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Adicionar
      </button>
    </form>
  );
}

export default AddTodo;
