import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Footer from "../components/Footer";
import {
  FaStar,
  FaRegStar,
  FaThumbsUp,
  FaRegThumbsUp,
  FaHeart,
  FaRegHeart,
  FaSmile,
  FaRegSmile,
} from "react-icons/fa";
import { toast } from "react-toastify"; // Para mensagens flash

const BASE_URL = "http://localhost:5000"; // Ajuste para a URL correta

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reactionType, setReactionType] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false); // Para garantir que o usuário só pode dar like uma vez
  const [recommendation, setRecommendation] = useState("");
  const [interactionType, setInteractionType] = useState("");
  const [score, setScore] = useState(0);
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/books/${bookId}`);
        setBook(response.data);
        setReviews(response.data.reviews || []);
        setLikeCount(response.data.likes || 0);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao carregar detalhes do livro:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [bookId]);

  const handleLike = async () => {
    if (userLiked) {
      toast.info("Você já curtiu este livro.");
      return;
    }

    try {
      await axiosInstance.post(`/api/${bookId}/like`);
      setUserLiked(true);
      setLikeCount(likeCount + 1);
      toast.success("Like registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar o like:", error);
      toast.error("Erro ao registrar o like.");
    }
  };

  const handleRating = async (selectedRating) => {
    setRating(selectedRating);

    try {
      await axiosInstance.post(`/api/${bookId}/rating`, {
        rating: selectedRating,
      });
      toast.success("Sua avaliação foi registrada!");
    } catch (error) {
      console.error("Erro ao registrar avaliação:", error);
      toast.error("Erro ao registrar avaliação.");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    try {
      await axiosInstance.post(`/api/${bookId}/reviews`, {
        rating,
        comment,
      });
      setReviews((prevReviews) => [
        ...prevReviews,
        { rating, comment, user: { name: "Você" } },
      ]);
      setComment("");
      setRating(0);
      toast.success("Comentário enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
      toast.error("Erro ao enviar comentário.");
    }
  };

  const handleReact = async (reviewId, reaction) => {
    if (!reaction) return;
    try {
      await axiosInstance.post(`/api/${reviewId}/reactions`, {
        reactionType: reaction,
      });
      toast.success("Reação enviada!");
    } catch (error) {
      console.error("Erro ao enviar reação:", error);
      toast.error("Erro ao enviar reação.");
    }
  };

  const handleRecommendationSubmit = async () => {
    if (recommendation.trim() === "") return;

    try {
      await axiosInstance.post(`/api/${bookId}/recommendations`, {
        recommendation,
        interactionType,
        score,
      });
      toast.success("Recomendação enviada!");
      setRecommendation("");
      setInteractionType("");
      setScore(0);
    } catch (error) {
      console.error("Erro ao enviar recomendação:", error);
      toast.error("Erro ao enviar recomendação.");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600">Carregando...</div>;
  }

  if (!book) {
    return (
      <div className="text-center text-red-500">Livro não encontrado.</div>
    );
  }

  const handleReadBook = async () => {
    try {
      // Faz a requisição para o backend para obter o livro
      const response = await axiosInstance.get(`/api/${bookId}/read`);

      // Verifica se a resposta foi bem-sucedida
      if (response.status === 200) {
        // Navega para a página do leitor e passa o file_url
        navigate("/reader", { state: { file_url: response.data.file_url } });
      } else {
        toast.error("Erro ao iniciar a leitura.");
      }
    } catch (error) {
      console.error("Erro ao iniciar a leitura:", error);
      toast.error("Erro ao iniciar a leitura.");
    }
  };

  return (
    <div className="bg-gray-100">
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden p-5 md:p-8">
          {/* Capa do Livro */}
          <div className="relative">
            <img
              src={`${BASE_URL}${book.coverUrl}`} // Aqui é onde a base URL é aplicada
              alt="Capa do livro"
              className="w-full h-64 object-cover rounded-md"
            />
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center rounded-md">
              <h1 className="text-white text-3xl font-bold">{book.title}</h1>
            </div>
          </div>
          <div className="flex items-center justify-end mt-4">
            <button
              onClick={handleReadBook}
              className="flex items-center bg-wood-brown text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-300 transition"
            >
              <FaRegSmile className="mr-2" />
              Ler este livro
            </button>
          </div>
          <div className="p-6">
            {/* Informações do Livro */}
            <h2 className="text-2xl font-semibold mb-2">{book.author}</h2>
            <p className="text-gray-600 mb-4">{book.description}</p>
            <p className="text-sm text-gray-500">
              Publicado em:{" "}
              {new Date(book.publicationDate).toLocaleDateString("pt-BR")}
            </p>
            <p className="text-lg font-bold mt-4">
              Preço: {book.isFree ? "Gratuito" : `R$ ${book.price}`}
            </p>

            {/* Reações */}
            <div className="flex items-center space-x-4 mt-6">
              <button
                className="flex items-center text-blue-500 space-x-2 hover:text-yellow-800 transition"
                onClick={handleLike}
              >
                <FaThumbsUp />
                <span>{likeCount}</span>
              </button>

              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleRating(i + 1)}
                    className={`transition ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    {i < rating ? <FaStar /> : <FaRegStar />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Formulário de comentário */}
          <form
            onSubmit={handleSubmitReview}
            className="flex items-center space-x-2 mt-4"
          >
            <div className="flex-1">
              <input
                type="text"
                className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Deixe seu comentário..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-wood-brown text-white px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-800 transition"
            >
              Enviar
            </button>
          </form>

          {/* Comentários */}
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border p-4 mb-4 shadow-md rounded-lg"
            >
              <div>
                {/* Verificando se o 'user' é uma string ou um objeto */}
                <strong>
                  {typeof review.user === "string"
                    ? review.user
                    : review.user.name || "Anônimo"}
                </strong>{" "}
                - Avaliação: {review.rating}
              </div>
              <div>{review.comment}</div>
            </div>
          ))}

          {/* Recomendação */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Recomendar este livro</h3>
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                className="flex-1 p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Diga o motivo da recomendação..."
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
              />
              <select
                className="p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={interactionType}
                onChange={(e) => setInteractionType(e.target.value)}
              >
                <option value="">Tipo de interação</option>
                <option value="reading">Lendo</option>
                <option value="read">Já li</option>
                <option value="wishlist">Quero ler</option>
              </select>
              <input
                type="number"
                className="w-20 p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nota"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                min="1"
                max="5"
              />
              <button
                onClick={handleRecommendationSubmit}
                className="bg-wood-brown text-white px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-800 transition"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BookDetails;
