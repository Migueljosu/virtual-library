import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { FaUpload, FaFileAlt, FaUser, FaTag, FaDollarSign, FaCalendar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";

const EditBook = () => {
  const { id } = useParams(); // Obtém o ID do livro a partir da URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("draft");
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carregar categorias
    axiosInstance
      .get("/api/categories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        toast.error("Erro ao carregar categorias");
      });

    // Carregar dados do livro
    axiosInstance
      .get(`/api/books/${id}`)
      .then((response) => {
        const book = response.data; // A resposta agora já vem diretamente com os dados do livro
        setTitle(book.title);
        setDescription(book.description);
        setAuthor(book.author);
        setCategory(book.category);
        setStatus(book.status);
        setIsFree(book.is_free); // Ajustado para 'is_free' que é a chave correta
        setPrice(book.price);
        setPublicationDate(book.publicationDate); // Ajustado para 'publicationDate' conforme esperado na resposta
        // Adicione lógica para carregar o arquivo e a imagem de capa se necessário
      })
      .catch((error) => {
        toast.error("Erro ao carregar dados do livro");
      });
  }, [id]);

  const handleEdit = async (e) => {
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

      const response = await axiosInstance.put(`/api/books/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
      });

      toast.success("Book updated successfully!");
      navigate(`/books/${id}`);
    } catch (error) {
      toast.error("An error occurred while updating the book.");
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

  const { getRootProps: getFileRootProps, getInputProps: getFileInputProps } = useDropzone({
    onDrop: handleFileChange,
    accept: ".pdf, .epub",
  });

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } = useDropzone({
    onDrop: handleCoverChange,
    accept: ".jpg, .jpeg, .png",
  });

  return (
    <form onSubmit={handleEdit} className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-wood-brown mb-4">Edit Book</h2>

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
        <label className="block text-sm font-semibold text-wood-brown">Status</label>
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
              Drag and drop a file or click to select a file
            </p>
          ) : (
            <p className="text-center text-gray-600">{file.name}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-wood-brown text-white px-6 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Book"}
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default EditBook;
