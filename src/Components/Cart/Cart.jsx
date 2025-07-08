import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContenxt";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    getUserCart,
    updateCartProduct,
    deleteCartItem,
    clearCart,
    cartItems,
    setCartItems,
  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingProductId, setUpdatingProductId] = useState(null);
  const [clearingCart, setClearingCart] = useState(false);

  async function getCartItems() {
    setLoading(true);
    try {
      const response = await getUserCart();
      if (response?.data?.status === "success") {
        setCartDetails(response.data.data);
      } else {
        toast.error("Failed to load cart items.");
      }
    } catch (error) {
      toast.error("An error occurred while loading cart items.");
    } finally {
      setLoading(false);
    }
  }

  async function updateProduct(id, count) {
    if (count < 1) return;
    setUpdatingProductId(id);
    try {
      const response = await updateCartProduct(id, count);
      if (response?.data?.status === "success") {
        setCartDetails(response.data.data);
        toast.success("Product Updated Successfully");
      } else {
        toast.error("Product Not Updated");
      }
    } catch (error) {
      toast.error("An error occurred while updating the product.");
    } finally {
      setUpdatingProductId(null);
    }
  }

  async function deleteItem(productId) {
    try {
      const response = await deleteCartItem(productId);
      if (response?.data?.status === "success") {
        setCartItems(cartItems - 1);
        setCartDetails(response.data.data);
        toast.success("Product Removed Successfully");
      } else {
        toast.error("Product Not Removed");
      }
    } catch (error) {
      toast.error("An error occurred while removing the product.");
    }
  }

  async function handleClearCart() {
    setClearingCart(true);
    try {
      const response = await clearCart();
      if (response?.data?.message === "success") {
        setCartDetails(response.data.data);
        setCartItems(0);
        toast.success("Cart Cleared Successfully");
      } else {
        toast.error("Failed to Clear Cart");
      }
    } catch (error) {
      toast.error("An error occurred while clearing the cart.");
    }
    setClearingCart(false);
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {loading ? (
        <span className="loader my-40 block mx-auto"></span>
      ) : cartDetails?.products?.length > 0 ? (
        <div className="cart mt-40 md:mt-24 bg-gradient-to-tr from-green-400 via-indigo-500 to-purple-700 text-white py-10 px-4 min-h-screen">
          <div className="overflow-x-auto shadow-xl rounded-lg bg-white text-black">
            <table className="w-full text-sm text-left">
              <thead className="text-sm md:text-lg uppercase bg-indigo-200 text-indigo-900">
                <tr>
                  <th className="px-2 py-4 md:px-6 md:py-8">Product Image</th>
                  <th className="px-2 py-4 md:px-6 md:py-8">Product</th>
                  <th className="px-2 py-4 md:px-6 md:py-8">Qty</th>
                  <th className="px-2 py-4 md:px-6 md:py-8">Price</th>
                  <th className="px-2 py-4 md:px-6 md:py-8">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartDetails.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b hover:bg-indigo-50 border-indigo-600"
                  >
                    <td className="p-2 md:p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-lg"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-2 py-2 md:px-6 md:py-4 font-semibold text-indigo-900">
                      {product.product.title}
                    </td>
                    <td className="px-2 py-2 md:px-6 md:py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count - 1)
                          }
                          className="text-indigo-600 bg-white border border-indigo-500 hover:bg-indigo-100 rounded-full p-1 h-6 w-6 flex items-center justify-center"
                          disabled={updatingProductId === product.product.id}
                        >
                          <svg className="w-3 h-3" viewBox="0 0 18 2">
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div className="mx-3">
                          {updatingProductId === product.product.id ? (
                            <i className="fa fa-spinner fa-spin fa-lg text-indigo-700"></i>
                          ) : (
                            <span>{product.count}</span>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count + 1)
                          }
                          className="text-indigo-600 bg-white border border-indigo-500 hover:bg-indigo-100 rounded-full p-1 h-6 w-6 flex items-center justify-center"
                          disabled={updatingProductId === product.product.id}
                        >
                          <svg className="w-3 h-3" viewBox="0 0 18 18">
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-2 md:px-6 md:py-4 font-semibold text-indigo-900">
                      {product.price} x {product.count} = {product.price * product.count}
                    </td>
                    <td className="px-2 py-2 md:px-6 md:py-4">
                      <span
                        onClick={() => deleteItem(product.product.id)}
                        className="font-medium text-red-600 hover:underline cursor-pointer"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center my-5">
            <h1 className="text-yellow-300 text-xl md:text-2xl lg:text-3xl font-bold">
              Total Price: {cartDetails?.totalCartPrice} EGP
            </h1>
            <button
              onClick={handleClearCart}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition"
              disabled={clearingCart}
            >
              {clearingCart ? (
                <i className="fa fa-spinner fa-spin text-white"></i>
              ) : (
                "Clear Cart"
              )}
            </button>
          </div>

          <Link to="/checkout">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg text-md w-full px-5 py-3 text-center block mt-3 transition">
              Payment
            </button>
          </Link>
        </div>
      ) : (
        <div className="empty-cart-message text-center my-40 text-white">
          <h2 className="text-yellow-300 text-lg md:text-4xl mb-3">Empty Cart</h2>
          <Link to="/products">
            <button className="bg-gradient-to-r from-green-500 via-blue-500 to-indigo-700 hover:from-green-600 hover:to-indigo-800 text-white font-bold py-2 px-5 rounded transition">
              Go to Products
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
