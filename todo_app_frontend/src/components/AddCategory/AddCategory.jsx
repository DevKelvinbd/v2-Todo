import React, { useState } from "react";
import styles from "./AddCategory.module.css";
import { FaTrash, FaPlus  } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";


function AddCategory({ categories, onCategoryCreated, onCategoryDeleted }) {
  const [categoryName, setCategoryName] = useState(""); // Estado para o nome da categoria
  const [showDropdown, setShowDropdown] = useState(false); // Controle do dropdown
  
  
  // Função para criar uma nova categoria
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      alert("O nome da categoria não pode estar vazio!");
      return;
    }

    try {
      await onCategoryCreated({ name: categoryName }); // Cria a categoria dinamicamente
      setCategoryName(""); // Limpa o campo
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  };


  // Função para excluir uma categoria
  const handleDeleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta categoria?"
    );
    if (!confirmDelete) return;

    try {
      await onCategoryDeleted(id); // Exclui a categoria
      setShowDropdown(false); // Fecha o dropdown após a exclusão
    } catch (error) {
      console.error("Erro ao excluir a categoria:", error);
      alert("Erro ao excluir a categoria. Tente novamente.");
    }
  };

  return (
    <div className={styles.divAddCategory}>
      {/* Formulário para adicionar categorias */}
      <form className={styles.formDiv} onSubmit={handleSubmit}>
        <input
          className={styles.styleInputCategory}
          type="text"
          placeholder="Digite o nome da categoria"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button className={styles.buttonAddCategory} type="submit">
          <FaPlus className={styles.IconAddCategory} />
        </button>

        <button
          className={styles.buttonTrash}
          type="button"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <FaTrash className={styles.iconTrash} />
        </button>
      </form>

      {/* Dropdown para listar e excluir categorias */}
      {showDropdown && (
        <ul className={styles.trashUl}>
          {categories.length === 0 ? (
            <li className={styles.trashLi}>Nenhuma categoria disponível</li>
          ) : (
            categories.map((category) => (
              <li className={styles.liCategoryTrash} key={category.id}>
                {category.name}
                <button
                  className={styles.buttonXTrash}
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <FaDeleteLeft />
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default AddCategory;
