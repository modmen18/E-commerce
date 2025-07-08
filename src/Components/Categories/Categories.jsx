import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryModal from "../CategoryModal/CategoryModal";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <section className="categories-section px-6 py-16 bg-gradient-to-br from-blue-100 to-green-100 min-h-[80vh]">
      <h1 className="text-center text-indigo-700 text-4xl font-bold mb-10 animate-fade-in">
        Explore Categories
      </h1>

      {categories.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white border border-blue-500 rounded-xl shadow-md hover:shadow-xl cursor-pointer transform hover:scale-[1.04] transition-all duration-300 p-4"
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={
                  category.image ||
                  "https://via.placeholder.com/300x200.png?text=No+Image"
                }
                alt={category.name}
                className="w-full h-[200px] object-cover bg-gray-100 rounded-lg mb-4"
              />
              <h2 className="text-center text-lg font-bold text-green-700">
                {category.name}
              </h2>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-20">
          <span className="loader w-14 h-14 border-4 border-indigo-500 rounded-full animate-spin"></span>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            {selectedCategory && (
              <>
                <img
                  src={selectedCategory.image}
                  alt={selectedCategory.name}
                  className="w-full h-[180px] object-cover bg-gray-100 rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                  {selectedCategory.name}
                </h2>
                <p className="text-gray-600">
                  Shop products in {selectedCategory.name} soon!
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
