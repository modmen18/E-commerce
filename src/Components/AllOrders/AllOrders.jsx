import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllOrders() {
  const [userId, setUserId] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserId = async () => {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyToken`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setUserId(res.data.decoded.id);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const getOrders = async (userId) => {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) getOrders(userId);
  }, [userId]);

  return (
    <section className="orders px-5 py-10 md:py-20 bg-gray-50 min-h-[80vh]">
      <h1 className="text-center text-indigo-700 text-4xl md:text-5xl font-bold mb-10 animate-fade-in">
        Your Orders
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loader w-14 h-14 border-4 border-blue-500 rounded-full animate-spin"></span>
        </div>
      ) : orders.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-lg rounded-xl border-l-[6px] border-blue-500 p-6 hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-green-600">
                  {order.shippingAddress?.details || "No address details"}
                </h2>
                <p className="text-indigo-500 mt-2">
                  📍 {order.shippingAddress?.city || "Unknown City"}
                </p>
                <p className="text-indigo-500">📞 {order.shippingAddress?.phone || "No phone"}</p>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-bold text-blue-700 mb-2">Items</h3>
                {order.cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 mb-4">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-green-600 text-lg">{item.product.title}</p>
                      <p className="text-gray-600">{item.product.category.name}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src={item.product.brand.image}
                          alt={item.product.brand.name}
                          className="w-8 h-8"
                        />
                        <span className="text-sm text-gray-500">{item.product.brand.name}</span>
                      </div>
                      <p className="text-sm mt-2 text-indigo-600">
                        🛒 Quantity: {item.count} — 💰 ${item.price * item.count}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No Orders"
            className="mx-auto w-32 mb-6"
          />
          <h2 className="text-blue-500 text-2xl font-semibold mb-4">No Orders Found</h2>
          <Link
            to={"/products"}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg"
          >
            Explore Products
          </Link>
        </div>
      )}
    </section>
  );
}
