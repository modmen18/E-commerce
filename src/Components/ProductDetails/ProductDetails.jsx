import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContenxt";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [product, setproduct] = useState(null);
  const [relatedproducts, setrelatedproducts] = useState([]);
  let { addProductToCart } = useContext(CartContext);
  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  let { cartItems, setCartItems } = useContext(CartContext);

  async function addToCart(id) {
    setcurrentId(id);
    setloading(true);
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      setCartItems(cartItems + 1);
      toast.success(response.data.message);
      setloading(false);
    } else {
      toast.error(response.data.message);
      setloading(false);
    }
  }

  let { id, category } = useParams();

  function getProductsDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((res) => {
      setproduct(res.data.data);
    });
  }

  function getProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
      let related = res.data.data.filter((product) => product.category.name == category);
      setrelatedproducts(related);
    });
  }

  useEffect(() => {
    setproduct(null);
    getProductsDetails(id);
    getProducts();
  }, [id, category]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  const settings1 = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <>
      {product ? (
        <div className="productdetails bg-gradient-to-r from-green-400 via-blue-500 to-indigo-700 text-white pt-20 pb-16 min-h-screen">
         
          <div className="px-6 mb-6">
            <Link
              to="/"
              className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold py-2 px-4 rounded-md shadow inline-flex items-center"
            >
              <i className="fa-solid fa-house mr-2"></i>
              Home
            </Link>
          </div>

          <div className="flex flex-wrap items-center px-6">
            <div className="w-full md:w-1/4 md:mr-5">
              <Slider {...settings}>
                {product.images.map((image, index) => (
                  <div key={index}>
                    <img className="w-full rounded-lg shadow-md" src={image} alt={product.title} />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="w-full md:w-[70%] mt-6">
              <h2 className="text-yellow-300 text-2xl mb-3 font-bold">{product?.title}</h2>
              <h3 className="text-white text-lg font-medium mb-3">{product?.description}</h3>
              <h4 className="text-white text-md mb-3">{product?.category.name}</h4>
              <div className="flex items-center justify-between text-white mb-4">
                <span className="font-semibold text-lg">{product.price} EGP</span>
                <span className="font-semibold text-lg">
                  <i className="fa fa-star text-yellow-400 mr-2"></i>
                  {product.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => addToCart(product.id)}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-md px-5 py-2.5 text-sm transition w-full"
              >
                {loading && currentId == product.id ? (
                  <i className="fa fa-spinner fa-spin fa-xl"></i>
                ) : (
                  "Add to cart"
                )}
                <i className="fa-solid fa-cart-shopping ml-2"></i>
              </button>
            </div>
          </div>

          <div className="mt-16 px-6">
            <h1 className="text-yellow-300 text-2xl mb-3 font-bold">Related Products</h1>
            <Slider {...settings1}>
              {relatedproducts.map((product) => (
                <div key={product.id} className="p-2">
                  <div className="border border-white rounded-xl overflow-hidden bg-white text-black shadow-lg">
                    <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                      <img className="w-full" src={product.imageCover} alt={product.title} />
                      <div className="p-3">
                        <h2 className="text-indigo-700 text-xl mb-2">{product.category.name}</h2>
                        <h3 className="text-lg font-semibold mb-3">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{product.price} EGP</span>
                          <span className="font-semibold">
                            <i className="fa fa-star text-yellow-500 mr-2"></i>
                            {product.ratingsAverage}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="bg-gradient-to-r from-green-500 to-indigo-600 hover:from-green-600 hover:to-indigo-700 text-white font-semibold rounded-md px-4 py-2 text-sm m-3 transition block w-full"
                    >
                      {loading && currentId == product.id ? (
                        <i className="fa fa-spinner fa-spin fa-xl"></i>
                      ) : (
                        "Add to cart"
                      )}
                      <i className="fa-solid fa-cart-shopping ml-2"></i>
                    </button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <span className="loader my-24 block mx-auto"></span>
      )}
    </>
  );
}
