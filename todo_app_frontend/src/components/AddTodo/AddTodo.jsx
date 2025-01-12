import React, { useState } from "react";
import styles from "./AddTodo.module.css";
import { BiSolidCategoryAlt } from "react-icons/bi";


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
    <form className={styles.formAddTodo} onSubmit={handleSubmit}>
      {/* Nome da tarefa */}
      <input
        className={styles.todoName}
        type="text"
        placeholder="Digite o nome da tarefa"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
      />

      {/* Dropdown de categorias */}
      <select
        className={styles.dropCategory}
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Ctg</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Dropdown de dificuldade */}
      <select
        className={styles.dropDificult}
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Fácil</option>
        <option value="medium">Média</option>
        <option value="hard">Difícil</option>
      </select>

      {/* Botão de adicionar */}
      <button className={styles.addButton} type="submit">
        Adicionar
      </button>
      
    </form>
  );
}

export default AddTodo;
