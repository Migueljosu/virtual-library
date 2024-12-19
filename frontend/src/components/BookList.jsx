import React, { useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaTh,
  FaList,
  FaStar,
  FaRegStar,
  FaSearch,
} from "react-icons/fa";

const BookList = () => {
  const books = [
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Fiction",
      cover: "https://via.placeholder.com/100x150",
      pages: 277,
      rating: 4,
      recommended: true,
    },
    {
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      cover: "https://via.placeholder.com/100x150",
      pages: 328,
      rating: 5,
      recommended: true,
    },
    {
      title: "Moby Dick",
      author: "Herman Melville",
      genre: "Adventure",
      cover: "https://via.placeholder.com/100x150",
      pages: 635,
      rating: 3,
      recommended: false,
    },
  ];

  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        
        <h2 className="text-3xl font-bold text-[#3E2A47] mb-4 md:mb-0">
          Books
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-[#A67C52]">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search books..."
              className="pl-10 pr-4 py-2 border border-[#A67C52] rounded-lg text-[#3E2A47] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className={`p-2 rounded-lg ${
              viewMode === "table"
                ? "bg-[#A67C52] text-white"
                : "bg-white border border-[#A67C52] text-[#A67C52]"
            }`}
            onClick={() => setViewMode("table")}
          >
            <FaList size={20} />
          </button>
          <button
            className={`p-2 rounded-lg ${
              viewMode === "grid"
                ? "bg-[#A67C52] text-white"
                : "bg-white border border-[#A67C52] text-[#A67C52]"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <FaTh size={20} />
          </button>
        </div>
      </div>

      {viewMode === "table" ? (
        <table className="min-w-full bg-white border border-[#A67C52] rounded-lg shadow-md">
          <thead className="bg-[#C49A6C]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Cover
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Author
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Genre
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Pages
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Recommended
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, idx) => (
              <tr
                key={idx}
                className="hover:bg-[#F5E0C1] transition-all duration-200 ease-in-out"
              >
                <td className="px-6 py-4 border-b">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  {book.title}
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  {book.author}
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  {book.genre}
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  {book.pages}
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  {[...Array(5)].map((_, i) =>
                    i < book.rating ? (
                      <FaStar key={i} color="#FFD700" />
                    ) : (
                      <FaRegStar key={i} color="#FFD700" />
                    )
                  )}
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  {book.recommended ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
                <td className="px-6 py-4 border-b">
                  <button className="text-[#2e8ed7] hover:text-[#6A4F3C] transition-colors duration-200">
                    <FaEdit size={20} />
                  </button>
                  <button className="text-[#fd2e2e] hover:text-[#A67C52] ml-4 transition-colors duration-200">
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.map((book, idx) => (
            <div
              key={idx}
              className="bg-[#F5E0C1] p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold text-[#3E2A47]">{book.title}</h3>
              <p className="text-[#6E4B3D] font-medium">by {book.author}</p>
              <span className="block text-sm text-[#3E2A47] mb-2">
                {book.genre}
              </span>
              <p className="text-sm text-[#3E2A47]">Pages: {book.pages}</p>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) =>
                  i < book.rating ? (
                    <FaStar key={i} color="#FFD700" />
                  ) : (
                    <FaRegStar key={i} color="#FFD700" />
                  )
                )}
              </div>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full ${
                  book.recommended
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {book.recommended ? "Recommended" : "Not Recommended"}
              </span>
              <div className="mt-4 flex space-x-4">
                <button className="text-[#3183d5] hover:text-[#6A4F3C] transition-colors duration-200">
                  <FaEdit size={20} />
                </button>
                <button className="text-[#ec2b2b] hover:text-[#A67C52] transition-colors duration-200">
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
