import React, { useState } from "react"; // Importa React e o hook useState.
import styles from "./AddTodo.module.css"; // Importa os estilos do componente.

function AddTodo({ categories, onTodoCreated }) {
  // Estados para armazenar os valores dos inputs do formulário.
  const [todoName, setTodoName] = useState(""); // Nome da tarefa.
  const [selectedCategory, setSelectedCategory] = useState(""); // Categoria selecionada.
  const [difficulty, setDifficulty] = useState("easy"); // Nível de dificuldade (valor padrão: "easy").

  // Função chamada ao enviar o formulário.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página).

    // Validação: Nome da tarefa não pode estar vazio.
    if (!todoName.trim()) {
      alert("O nome da tarefa não pode estar vazio!"); // Mostra um alerta se o campo estiver vazio.
      return;
    }

    // Validação: Uma categoria precisa ser selecionada.
    if (!selectedCategory) {
      alert("Por favor, selecione uma categoria!"); // Mostra um alerta se nenhuma categoria for selecionada.
      return;
    }

    // Passa os dados da nova tarefa para a função `onTodoCreated` recebida via props.
    await onTodoCreated({
      todo_name: todoName, // Nome da tarefa.
      completed: false, // Define a tarefa como não concluída inicialmente.
      category_id: selectedCategory, // ID da categoria selecionada.
      difficulty, // Nível de dificuldade selecionado.
    });

    // Limpa os inputs do formulário após adicionar a tarefa.
    setTodoName(""); // Limpa o nome da tarefa.
    setSelectedCategory(""); // Limpa a categoria selecionada.
    setDifficulty("easy"); // Reseta a dificuldade para o valor padrão.
  };

  return (
    <form className={styles.formAddTodo} onSubmit={handleSubmit}>
      {/* Campo de entrada para o nome da tarefa */}
      <input
        className={styles.todoName} // Classe de estilo para o input.
        type="text" // Tipo de input: texto.
        placeholder="Digite o nome da tarefa" // Placeholder exibido no campo.
        value={todoName} // Valor do campo controlado pelo estado `todoName`.
        onChange={(e) => setTodoName(e.target.value)} // Atualiza o estado ao digitar.
      />

      {/* Dropdown para selecionar a categoria */}
      <select
        className={styles.dropCategory} // Classe de estilo para o select.
        value={selectedCategory} // Valor do select controlado pelo estado `selectedCategory`.
        onChange={(e) => setSelectedCategory(e.target.value)} // Atualiza o estado ao selecionar uma categoria.
      >
        <option value="">Ctg</option> {/* Opção padrão sem valor (placeholder). */}
        {/* Mapeia as categorias recebidas via props para criar as opções do dropdown */}
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Dropdown para selecionar o nível de dificuldade */}
      <select
        className={styles.dropDificult} // Classe de estilo para o select.
        value={difficulty} // Valor do select controlado pelo estado `difficulty`.
        onChange={(e) => setDifficulty(e.target.value)} // Atualiza o estado ao selecionar uma dificuldade.
      >
        <option value="easy">Fácil</option> {/* Opção de dificuldade: fácil. */}
        <option value="medium">Média</option> {/* Opção de dificuldade: média. */}
        <option value="hard">Difícil</option> {/* Opção de dificuldade: difícil. */}
      </select>

      {/* Botão para adicionar a tarefa */}
      <button className={styles.addButton} type="submit">
        Adicionar {/* Texto exibido no botão */}
      </button>
    </form>
  );
}

export default AddTodo; // Exporta o componente AddTodo.