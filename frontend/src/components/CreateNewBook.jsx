import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axiosInstance from "../utils/axiosInstance"; // Certifique-se de importar corretamente sua instância axios
import {
  FaUpload,
  FaFileAlt,
  FaUser,
  FaTag,
  FaDollarSign,
  FaCalendar,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Importando toast e ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Estilo do toastify

const CreateNewBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState(""); // Categoria do livro
  const [categories, setCategories] = useState([]); // Lista de categorias carregadas
  const [status, setStatus] = useState("draft");
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  // Carregar todas as categorias na inicialização
  useEffect(() => {
    setLoading(true); // Indica que o carregamento começou
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
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("author", author);
      formData.append("category", category); 
      formData.append("status", status);
      formData.append("isFree", isFree);
      if (!isFree) formData.append("price", price);
      formData.append("publicationDate", publicationDate);
      if (file) formData.append("file", file);
      if (coverImage) formData.append("coverImage", coverImage);

      const response = await axiosInstance.post("/api/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          setProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      });

      toast.success("Book created successfully!"); // Exibe o toast de sucesso
      console.log(response.data);
      // Limpar os campos após a criação
      setTitle("");
      setDescription("");
      setAuthor("");
      setCategory("");
      setStatus("draft");
      setIsFree(true);
      setPrice("");
      setPublicationDate("");
      setFile(null);
      setCoverImage(null);
      setProgress(0);
    } catch (error) {
      console.error("Error creating book:", error);
      toast.error("An error occurred while creating the book."); // Exibe o toast de erro
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (acceptedFiles) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
    }
  };

  const handleCoverChange = (acceptedFiles) => {
    if (acceptedFiles[0]) {
      setCoverImage(acceptedFiles[0]);
    }
  };

  const { getRootProps: getFileRootProps, getInputProps: getFileInputProps } =
    useDropzone({
      onDrop: handleFileChange,
      accept: ".pdf, .epub",
    });

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } =
    useDropzone({
      onDrop: handleCoverChange,
      accept: ".jpg, .jpeg, .png",
    });

  return (
    <form onSubmit={handleCreate} className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-wood-brown mb-4 mt-10">
        Create a New Book
      </h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaTag className="inline-block mr-2" />
          Book Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
          placeholder="Enter book title"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaFileAlt className="inline-block mr-2" />
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
          placeholder="Enter book description"
          rows="4"
          required
        />
      </div>

      {/* Author */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaUser className="inline-block mr-2" />
          Author
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
          placeholder="Enter author name"
          required
        />
      </div>

      {/* Genre */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaTag className="inline-block mr-2" />
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          Status
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="published"
              checked={status === "published"}
              onChange={() => setStatus("published")}
              className="mr-2"
            />
            Published
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="draft"
              checked={status === "draft"}
              onChange={() => setStatus("draft")}
              className="mr-2"
            />
            Draft
          </label>
        </div>
      </div>

      {/* Free or Paid */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaDollarSign className="inline-block mr-2" />
          Is the book free?
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isFree}
              onChange={() => setIsFree(!isFree)}
              className="mr-2"
            />
            Yes, it's free
          </label>
        </div>
      </div>

      {!isFree && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-wood-brown">
            <FaDollarSign className="inline-block mr-2" />
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter book price"
            required
          />
        </div>
      )}

      {/* Publication Date */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaCalendar className="inline-block mr-2" />
          Publication Date
        </label>
        <input
          type="date"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Upload Cover */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaUpload className="inline-block mr-2" />
          Upload Cover Image
        </label>
        <div
          {...getCoverRootProps()}
          className="border-dashed border-2 border-gray-300 p-4 rounded-md"
        >
          <input {...getCoverInputProps()} />
          {!coverImage ? (
            <p className="text-center text-gray-600">
              Drag and drop an image or click to select a file
            </p>
          ) : (
            <img
              src={URL.createObjectURL(coverImage)}
              alt="Cover Preview"
              className="w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>
      </div>

      {/* Upload File */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaUpload className="inline-block mr-2" />
          Upload Book File
        </label>
        <div
          {...getFileRootProps()}
          className="border-dashed border-2 border-gray-300 p-4 rounded-md"
        >
          <input {...getFileInputProps()} />
          {!file ? (
            <p className="text-center text-gray-600">
              Drag and drop your book file here
            </p>
          ) : (
            <div>
              <FaFileAlt className="text-2xl text-gray-600" />
              <span className="block text-gray-700">{file.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {loading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full mt-6 py-2 px-4 bg-wood-brown hover:bg-brown-600 rounded-md text-white font-semibold"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Create Book"}
      </button>

      {/* ToastContainer para mostrar notificações */}
      <ToastContainer />
    </form>
  );
};

export default CreateNewBook;
