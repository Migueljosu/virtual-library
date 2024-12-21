import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // Certifique-se de importar corretamente sua instância axios
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Estilo do toast

const CategoryManager = () => {
  const [categories, setCategories] = useState([]); // Inicializa com um array vazio
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [loading, setLoading] = useState(true); // Set loading to true inicialmente

  // Carregar todas as categorias na inicialização
  useEffect(() => {
    axiosInstance
      .get("/api/categories")
      .then((response) => {
        const data = Array.isArray(response.data.categories)
          ? response.data.categories
          : [];
        setCategories(data); // Atualiza o estado com as categorias carregadas
      })
      .catch((error) => {
        toast.error("Erro ao carregar categorias"); // Exibe notificação de erro
      })
      .finally(() => setLoading(false)); // Finaliza o carregamento
  }, []);

  // Adicionar categoria
  const addCategory = () => {
    if (newCategory.trim() === "") return;
    setLoading(true);
    axiosInstance
      .post("/api/categories", { name: newCategory })
      .then((response) => {
        const addedCategory = response.data.category; // A categoria criada está dentro de 'category'
        setCategories((prevCategories) => [...prevCategories, addedCategory]); // Adiciona a nova categoria ao estado
        setNewCategory(""); // Limpa o campo de entrada
        toast.success("Categoria adicionada com sucesso!"); // Notificação de sucesso
      })
      .catch((error) => {
        toast.error("Erro ao adicionar categoria."); // Notificação de erro
      })
      .finally(() => setLoading(false)); // Finaliza o carregamento
  };

  // Atualizar categoria
  const updateCategory = (id) => {
    if (editedName.trim() === "") return;
    setLoading(true);
    axiosInstance
      .put(`/api/categories/${id}`, { name: editedName })
      .then(() => {
        setCategories(
          categories.map((cat) =>
            cat.id === id ? { ...cat, name: editedName } : cat
          )
        );
        setEditingCategory(null);
        setEditedName("");
        toast.success("Categoria atualizada com sucesso!"); // Notificação de sucesso
      })
      .catch((error) => {
        toast.error("Erro ao atualizar categoria."); // Notificação de erro
      })
      .finally(() => setLoading(false)); // Finaliza o carregamento
  };

  // Excluir categoria
  const deleteCategory = (id) => {
    setLoading(true);
    axiosInstance
      .delete(`/api/categories/${id}`)
      .then(() => {
        setCategories(categories.filter((cat) => cat.id !== id)); // Remove a categoria do estado
        toast.success("Categoria removida com sucesso!"); // Notificação de sucesso
      })
      .catch((error) => {
        toast.error("Erro ao remover categoria."); // Notificação de erro
      })
      .finally(() => setLoading(false)); // Finaliza o carregamento
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-wood-brown">
        Gerenciar Categorias
      </h1>

      {/* Div1: Adicionar Categoria */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-wood-brown">
          Adicionar Categoria
        </h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Nova Categoria"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mr-2 flex-grow"
          />
          <button
            onClick={addCategory}
            className="bg-wood-brown text-white px-4 py-2 rounded-md hover:bg-brown-600 flex items-center"
          >
            <FaPlus className="mr-2" /> Adicionar
          </button>
        </div>
      </div>

      {/* Div2: Mostrar Categorias Existentes */}
      <div>
        <h2 className="text-xl font-semibold mb-2 text-wood-brown">
          Categorias Existentes
        </h2>
        {loading ? (
          <p className="text-center text-gray-600">Carregando categorias...</p> // Exibe "Carregando categorias" enquanto estiver em processo de carregamento
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-4 bg-white border rounded-md shadow-md"
              >
                <div className="flex justify-between items-center">
                  <div>
                    {editingCategory === category.id ? (
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    ) : (
                      <span className="text-lg font-semibold">
                        {category.name}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {editingCategory === category.id ? (
                      <button
                        onClick={() => updateCategory(category.id)}
                        className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
                      >
                        Salvar
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingCategory(category.id);
                          setEditedName(category.name);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                    )}
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            Nenhuma categoria encontrada.
          </p>
        )}
      </div>

      {/* ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeButton={false}
      />
    </div>
  );
};

export default CategoryManager;
