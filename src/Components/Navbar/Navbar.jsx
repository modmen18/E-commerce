import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContenxt";
import { WishContext } from "../../Context/WishContext";
import { motion } from "framer-motion";


export default function Navbar() {
  const [user, setUser] = useState(() => localStorage.getItem("userToken") || null);
  const navigate = useNavigate();
  const { cartItems, getUserCart } = useContext(CartContext);
  const { wishItems, getUserWish } = useContext(WishContext);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setUser(token);
  }, [localStorage.getItem("userToken")]);

  useEffect(() => {
    getUserCart();
    getUserWish();
  }, [user, getUserCart, getUserWish]);

  function handleSignout() {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/login");
  }

  return (
  <motion.nav
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-gradient-to-r from-green-400 via-blue-500 to-indigo-700 text-white py-1 fixed w-full top-0 z-50 shadow-lg"
>
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
    <div className="flex items-center gap-8">
      <Link to="/">
        <img src={logo} alt="Logo" className="w-36 h-10" />
      </Link>

      {user && (
        <ul className="flex gap-4 font-medium">
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
            <NavLink to="/" className="hover:text-yellow-300 transition">Home</NavLink>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
            <NavLink to="/products" className="hover:text-yellow-300 transition">Products</NavLink>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
            <NavLink to="/categories" className="hover:text-yellow-300 transition">Categories</NavLink>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
            <NavLink to="/brands" className="hover:text-yellow-300 transition">Brands</NavLink>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
            <NavLink to="/allorders" className="hover:text-yellow-300 transition">Orders</NavLink>
          </motion.li>
        </ul>
      )}
    </div>

    <div className="flex items-center gap-6">
      <div className="flex gap-3 text-white/80 text-lg">
        {["facebook", "tiktok", "instagram", "twitter", "linkedin", "youtube"].map((icon, index) => (
          <motion.i
            key={icon}
            className={`fab fa-${icon} hover:text-white transition cursor-pointer`}
            whileHover={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        ))}
      </div>

      <div className="flex gap-4 items-center font-medium">
        {user ? (
          <>
            <NavLink to="/wishlist" className="relative text-lg">
              <i className="fa-solid fa-heart"></i>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-[-10px] right-[-15px] w-6 h-6 bg-yellow-400 text-black rounded-full text-sm flex justify-center items-center"
              >
                {wishItems || 0}
              </motion.div>
            </NavLink>
            <NavLink to="/cart" className="relative text-lg">
              <i className="fa-solid fa-cart-shopping"></i>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-[-10px] right-[-15px] w-6 h-6 bg-yellow-400 text-black rounded-full text-sm flex justify-center items-center"
              >
                {cartItems || 0}
              </motion.div>
            </NavLink>
            <span onClick={handleSignout} className="cursor-pointer hover:text-yellow-300 transition">Logout</span>
          </>
        ) : (
          <>
            <NavLink to="/login" className="hover:text-yellow-300 transition">Login</NavLink>
            <NavLink to="/register" className="hover:text-yellow-300 transition">Register</NavLink>
          </>
        )}
      </div>
    </div>
  </div>
</motion.nav>

  );
}
