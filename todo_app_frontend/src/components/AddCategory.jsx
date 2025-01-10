import React, { useState } from "react";

function AddCategory({ categories, onCategoryCreated, onCategoryDeleted }) {
  const [categoryName, setCategoryName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("O nome da categoria não pode estar vazio!");
      return;
    }

    await onCategoryCreated({ name: categoryName }); // Cria a categoria
    setCategoryName(""); // Limpa o campo
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?"))
      return;

    await onCategoryDeleted(id); // Chama a função passada via props
    setShowDropdown(false); // Fecha o dropdown após a exclusão
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da categoria"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Adicionar Categoria
        </button>
        <button
          type="button"
          onClick={() => setShowDropdown((prev) => !prev)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          🗑️
        </button>
      </form>

      {/* Dropdown para excluir categorias */}
      {showDropdown && (
        <ul
          style={{
            marginTop: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            listStyleType: "none",
            backgroundColor: "#000000",
          }}
        >
          {categories.length === 0 ? (
            <li style={{ textAlign: "center", padding: "5px" }}>
              Nenhuma categoria disponível
            </li>
          ) : (
            categories.map((category) => (
              <li
                key={category.id}
                style={{
                  padding: "5px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {category.name}
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#f44336",
                    cursor: "pointer",
                  }}
                >
                  ❌
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
