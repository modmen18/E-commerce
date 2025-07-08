import React, { useEffect, useState } from "react";
import axios from "axios";
import BrandsModal from "../BrandsModal/BrandsModal";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => setBrands(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBrand(null);
    setIsModalOpen(false);
  };

  return (
    <section className="brands-section px-6 py-16 bg-gradient-to-br from-blue-100 to-green-100 min-h-[80vh]">
      <h1 className="text-center text-indigo-700 text-4xl font-bold mb-10 animate-fade-in">
        Our Brands
      </h1>

      {brands.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="bg-white border border-blue-500 rounded-xl shadow-md hover:shadow-xl cursor-pointer transform hover:scale-[1.04] transition-all duration-300 p-4"
              onClick={() => handleBrandClick(brand)}
            >
              <img
                src={brand.image || "https://via.placeholder.com/200x150.png?text=No+Image"}
                alt={brand.name}
                className="w-full h-[160px] object-contain bg-gray-100 rounded-lg mb-4"
              />
              <h2 className="text-center text-lg font-bold text-green-700">
                {brand.name}
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
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
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
            {selectedBrand && (
              <>
                <img
                  src={selectedBrand.image}
                  alt={selectedBrand.name}
                  className="w-full h-[180px] object-contain mb-4 bg-gray-100 rounded-md"
                />
                <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                  {selectedBrand.name}
                </h2>
                <p className="text-gray-600">Explore products from this brand soon!</p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
