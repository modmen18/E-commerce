import React, { useState, useEffect, useContext } from "react";
import { WishContext } from "../../Context/WishContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContenxt";

export default function Wishlist() {
  const { deleteWishItem, getUserWish, wishItems, setwishItems } =
    useContext(WishContext);
  let { addProductToCart, cartItems, setCartItems } = useContext(CartContext);
  const [wishDetails, setWishDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [currentId, setCurrentId] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  async function addToCart(id) {
    setCurrentId(id);
    setIsAddingToCart(true);
    let response = await addProductToCart(id);
    if (response?.data?.status === "success") {
      setCartItems(cartItems + 1);
      toast.success(response.data.message);
      await deleteItem(id);
    } else {
      toast.error(response.data.message);
    }
    setIsAddingToCart(false);
  }

  async function getWishItems() {
    setLoading(true);
    const response = await getUserWish();
    if (response?.data?.status === "success") {
      setWishDetails(response.data.data);
    } else {
      toast.error("Failed to load wishlist items.");
    }
    setLoading(false);
  }

  async function deleteItem(productId) {
    setDeletingProductId(productId);

    const updatedWishDetails = wishDetails.filter(
      (item) => item.id !== productId
    );
    setWishDetails(updatedWishDetails);

    const response = await deleteWishItem(productId);
    if (response?.data?.status === "success") {
      setwishItems(wishItems - 1);
      toast.success("Product Removed Successfully");
    } else {
      setWishDetails(wishDetails);
      toast.error("Product Not Removed");
    }

    setDeletingProductId(null);
  }

  useEffect(() => {
    getWishItems();
  }, []);

  return (
    <div className="wishlist bg-gradient-to-r from-green-400 via-blue-500 to-indigo-700 text-white py-10 px-6 min-h-screen mt-40 md:mt-24">
      {loading ? (
        <span className="loader my-40 block mx-auto"></span>
      ) : wishDetails.length > 0 ? (
        wishDetails.map((item) => (
          <div
            key={item.id}
            className="wishlistItem bg-white text-black shadow-lg rounded-xl p-6 mb-6 w-full"
          >
            <div className="details flex flex-col md:flex-row justify-between items-center gap-5">
              <div className="image">
                <Link to={`/productdetails/${item?.id}/${item?.category?.name}`}>
                  <img className="w-[250px] rounded-lg" src={item.imageCover} alt={item.title} />
                </Link>
              </div>
              <div className="w-full">
                <h2 className="text-indigo-700 text-2xl mb-3 font-bold">{item.title}</h2>
                <p className="text-gray-800 text-lg mt-2">{item.description}</p>
                <img src={item?.brand?.image} alt={item?.brand?.name} className="w-[100px] mt-3" />
                <p className="font-semibold text-lg mt-3">{item.price} EGP</p>
                <div className="mt-4 flex flex-col md:flex-row gap-3">
                  <button
                    className="deleteButton bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md transition"
                    onClick={() => deleteItem(item.id)}
                    disabled={deletingProductId === item.id}
                  >
                    {deletingProductId === item.id ? (
                      <i className="fa fa-spinner fa-spin fa-xl"></i>
                    ) : (
                      "Remove"
                    )}
                  </button>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-md px-5 py-2.5 text-sm transition block"
                    disabled={isAddingToCart && currentId === item.id}
                  >
                    {isAddingToCart && currentId === item.id ? (
                      <i className="fa fa-spinner fa-spin fa-xl"></i>
                    ) : (
                      "Add to cart"
                    )}
                    <i className="fa-solid fa-cart-shopping ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-yellow-300 font-semibold text-3xl md:text-4xl my-24 md:my-32 w-11/12 md:w-3/4 mx-auto text-center p-5">
          Your wishlist is empty
        </h1>
      )}
    </div>
  );
}
