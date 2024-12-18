import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload, FaFileAlt, FaRegClock, FaUser, FaTag, FaDollarSign, FaCalendar } from "react-icons/fa"; // Ícones

const CreateNewBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState(""); // Alterado de categoria para gênero
  const [status, setStatus] = useState("draft");
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    console.log("Creating new book:", { title, description, author, genre, status, isFree, price, publicationDate, file });
    // Adicionar lógica para salvar o livro, como enviar para o backend
  };

  const handleFileChange = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    // Aqui você pode fazer a requisição para o backend com axios ou fetch
    setTimeout(() => {
      setLoading(false);
      setProgress(100);
      alert("File uploaded!");
    }, 2000);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
    accept: ".pdf, .epub, .mobi, .jpg, .jpeg, .png", // Aceitar diversos tipos de arquivos
  });

  return (
    <form onSubmit={handleCreate} className="bg-white p-6 shadow-md rounded-lg">
      {/* Título do Livro */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaTag className="inline-block mr-2" />
          Book Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter book title"
          required
        />
      </div>

      {/* Descrição */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaFileAlt className="inline-block mr-2" />
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter book description"
          rows="4"
          required
        />
      </div>

      {/* Autor */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaUser className="inline-block mr-2" />
          Author
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter author name"
          required
        />
      </div>

      {/* Gênero do Livro */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaTag className="inline-block mr-2" />
          Genre
        </label>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        >
          <option value="">Select Genre</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-fiction</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="biography">Biography</option>
          {/* Adicionar mais categorias aqui */}
        </select>
      </div>

      {/* Status do Livro */}
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

      {/* Grátis ou Pago */}
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

      {/* Preço (visível se não for gratuito) */}
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
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter book price"
            required
          />
        </div>
      )}

      {/* Data de Publicação */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaCalendar className="inline-block mr-2" />
          Publication Date
        </label>
        <input
          type="date"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      {/* Upload da Capa do Livro */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaUpload className="inline-block mr-2" />
          Upload Cover Image
        </label>
        <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 rounded-md">
          <input {...getInputProps()} />
          {!file ? (
            <p className="text-center text-gray-600">Drag and drop an image or click to select a file</p>
          ) : (
            <div className="flex items-center space-x-4">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md"
                />
              ) : (
                <FaFileAlt className="text-2xl text-gray-600" />
              )}
              <div>
                <span className="block text-gray-700">{file.name}</span>
                <span className="block text-sm text-gray-500">
                  {Math.round(file.size / 1024)} KB
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload do Arquivo do Livro */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-wood-brown">
          <FaUpload className="inline-block mr-2" />
          Upload Book File (PDF, EPUB, etc.)
        </label>
        <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 rounded-md">
          <input {...getInputProps()} />
          {!file ? (
            <p className="text-center text-gray-600">Drag and drop your book file here</p>
          ) : (
            <div className="flex items-center space-x-4">
              <FaFileAlt className="text-2xl text-gray-600" />
              <div>
                <span className="block text-gray-700">{file.name}</span>
                <span className="block text-sm text-gray-500">
                  {Math.round(file.size / 1024)} KB
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Barra de Progresso */}
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

      {/* Botão para Criar Livro */}
      <button
        type="submit"
        onClick={handleUpload}
        className="w-full mt-6 py-2 px-4 bg-brown-500 hover:bg-brown-600 rounded-md text-white font-semibold"
      >
        {loading ? "Uploading..." : "Create Book"}
      </button>
    </form>
  );
};

export default CreateNewBook;
