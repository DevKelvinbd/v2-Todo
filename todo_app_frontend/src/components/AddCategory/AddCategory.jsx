import React, { useState } from "react"; // Importa React e o hook useState.
import styles from "./AddCategory.module.css"; // Importa os estilos do componente.
import { FaTrash, FaPlus } from "react-icons/fa"; // Importa ícones da biblioteca react-icons.
import { FaDeleteLeft } from "react-icons/fa6"; // Importa o ícone "delete" da biblioteca react-icons/fa6.

function AddCategory({ categories, onCategoryCreated, onCategoryDeleted }) {
  // Estado para armazenar o nome da nova categoria.
  const [categoryName, setCategoryName] = useState("");

  // Estado para controlar se o dropdown de categorias deve ser exibido.
  const [showDropdown, setShowDropdown] = useState(false);

  // Função chamada ao enviar o formulário para criar uma nova categoria.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página).

    if (!categoryName.trim()) {
      // Valida se o campo de nome está vazio ou contém apenas espaços.
      alert("O nome da categoria não pode estar vazio!"); // Mostra um alerta.
      return;
    }

    try {
      // Chama o callback `onCategoryCreated` para criar a categoria no backend.
      await onCategoryCreated({ name: categoryName });
      setCategoryName(""); // Limpa o campo de entrada após criar a categoria.
    } catch (error) {
      console.error("Erro ao criar categoria:", error); // Loga o erro caso ocorra.
    }
  };

  // Função chamada para excluir uma categoria.
  const handleDeleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta categoria?" // Mostra um diálogo de confirmação.
    );
    if (!confirmDelete) return; // Retorna se o usuário cancelar a exclusão.

    try {
      // Chama o callback `onCategoryDeleted` para excluir a categoria no backend.
      await onCategoryDeleted(id);
      setShowDropdown(false); // Fecha o dropdown após a exclusão.
    } catch (error) {
      console.error("Erro ao excluir a categoria:", error); // Loga o erro caso ocorra.
      alert("Erro ao excluir a categoria. Tente novamente."); // Mostra um alerta de erro.
    }
  };

  return (
    <div className={styles.divAddCategory}>
      {/* Formulário para adicionar novas categorias */}
      <form className={styles.formDiv} onSubmit={handleSubmit}>
        {/* Campo de entrada para o nome da nova categoria */}
        <input
          className={styles.styleInputCategory}
          type="text"
          placeholder="Digite o nome da categoria" // Placeholder exibido no campo.
          value={categoryName} // Valor do campo controlado pelo estado.
          onChange={(e) => setCategoryName(e.target.value)} // Atualiza o estado ao digitar.
        />

        {/* Botão para adicionar uma nova categoria */}
        <button className={styles.buttonAddCategory} type="submit">
          <FaPlus className={styles.IconAddCategory} /> {/* Ícone de "+" para adicionar */}
        </button>

        {/* Botão para alternar a exibição do dropdown de categorias */}
        <button
          className={styles.buttonTrash}
          type="button" // Tipo "button" para evitar envio do formulário.
          onClick={() => setShowDropdown((prev) => !prev)} // Alterna o estado do dropdown.
        >
          <FaTrash className={styles.iconTrash} /> {/* Ícone de lixeira */}
        </button>
      </form>

      {/* Dropdown para listar e excluir categorias */}
      {showDropdown && (
        <ul className={styles.trashUl}>
          {/* Verifica se há categorias disponíveis */}
          {categories.length === 0 ? (
            <li className={styles.trashLi}>Nenhuma categoria disponível</li> // Exibe mensagem se não houver categorias.
          ) : (
            // Renderiza a lista de categorias.
            categories.map((category) => (
              <li className={styles.liCategoryTrash} key={category.id}>
                {category.name} {/* Nome da categoria */}
                <button
                  className={styles.buttonXTrash} // Botão para excluir a categoria.
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <FaDeleteLeft /> {/* Ícone de "excluir" */}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default AddCategory; // Exporta o componente AddCategory.