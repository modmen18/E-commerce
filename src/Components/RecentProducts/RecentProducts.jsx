import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContenxt";
import { WishContext } from "../../Context/WishContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  let products = useProducts();
  let { addProductToCart, cartItems, setCartItems } = useContext(CartContext);
  let { addProductToWish, wishItems, setwishItems, deleteWishItem } = useContext(WishContext);

  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  async function addToCart(id) {
    setcurrentId(id);
    setloading(true);
    let response = await addProductToCart(id);
    if (response?.data?.status === "success") {
      setCartItems(cartItems + 1);
      toast.success(response.data.message);
      setloading(false);
    } else {
      toast.error(response.data.message);
      setloading(false);
    }
  }

  async function toggleWish(id) {
    if (wishlist.includes(id)) {
      let response = await deleteWishItem(id);
      if (response?.data?.status === "success") {
        setwishItems(wishItems - 1);
        setWishlist(wishlist.filter((itemId) => itemId !== id));
        toast.success("Product Removed Successfully");
      } else {
        toast.error("Product Not Removed");
      }
    } else {
      let response = await addProductToWish(id);
      if (response?.data?.status === "success") {
        setwishItems(wishItems + 1);
        setWishlist([...wishlist, id]);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  }

  return (
    <div className="recentproducts pt-24 px-4">
      <h1 className="text-5xl text-center text-emerald-600 font-bold mb-5 animate-titleFade">Our Products</h1>

      {currentProducts.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 justify-items-center animate-fadeSwap">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="relative shadow-lg p-4 text-center cursor-pointer flex-col h-full transition-all duration-500 ease-in-out transform hover:scale-105 animate-slideUp"
              >
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="mx-auto mb-3 w-full h-40 object-cover rounded transition duration-300 ease-in-out hover:scale-105"
                  />
                </Link>
                <h3 className="text-lg font-bold text-green-500">
                  {product.category.name}
                </h3>
                <h2 className="font-bold text-gray-800">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h2>

                <div className="flex justify-between mt-2 text-sm items-center">
                  {product.priceAfterDiscount && product.priceAfterDiscount < product.price ? (
                    <div className="flex flex-col items-start">
                      <span className="text-black font-bold">{product.priceAfterDiscount} EGP</span>
                      <span className="line-through text-red-800 font-bold text-sm">{product.price} EGP</span>
                    </div>
                  ) : (
                    <h3 className="font-bold">{product.price} EGP</h3>
                  )}
                  <span className="font-bold">
                    <i className="fas fa-star text-yellow-300"></i>
                    {product.ratingsAverage}
                  </span>
                </div>

                {product.priceAfterDiscount && (
                  <span className="absolute top-2 left-2 bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded border border-red-400 animate-pingBadge">
                    Sale
                  </span>
                )}

                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => addToCart(product.id)}
                    className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-bold rounded-lg text-sm px-6 w-full py-2 text-center me-4 transition-transform duration-300 hover:scale-105"
                  >
                    {loading && currentId === product.id ? (
                      <i className="fa fa-spinner fa-spin fa-xl text-white"></i>
                    ) : (
                      "Add to cart"
                    )}
                  </button>
                  <i
                    onClick={() => toggleWish(product.id)}
                    className={`fa-heart fa-xl cursor-pointer transition-transform duration-300 ${
                      wishlist.includes(product.id)
                        ? "fa-solid text-red-700 scale-110"
                        : "fa-regular text-red-700"
                    }`}
                  ></i>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination flex justify-center mt-6 items-center gap-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-6 py-2 text-white font-bold rounded-lg shadow transition-transform duration-300 ${
                currentPage === 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 hover:scale-105'
              }`}
            >
              back
            </button>

            <span className="text-lg font-bold bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white shadow text-emerald-800">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-6 py-2 text-white font-bold rounded-lg shadow transition-transform duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 hover:scale-105'
              }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <span className="loader my-40 block mx-auto animate-spin"></span>
      )}
    </div>
  );
}
