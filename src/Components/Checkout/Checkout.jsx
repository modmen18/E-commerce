import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContenxt";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Checkout() {
  const [isLoading, setisLoading] = useState(false);
  let { checkout, cartId } = useContext(CartContext);

  let validationSchema = Yup.object().shape({
    details: Yup.string().required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
      .max(11, "Max length is 11")
      .required("Phone is required"),
    city: Yup.string().required("City is required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: () =>
      handleCheckout(cartId, `https://fresh-cart-route.vercel.app`),
  });

  async function handleCheckout(cartId, url) {
    setisLoading(true);
    try {
      let { data } = await checkout(cartId, url, formik.values);
      window.location.href = data.session.url;
    } catch (error) {
      console.error(error);
    }
    setisLoading(false);
  }

  return (
    <>
      <div className="w-full mt-40 md:mt-24 bg-gradient-to-br from-yellow-50 via-purple-200 to-indigo-300 py-14 px-6 min-h-screen text-black">
        <h2 className="font-bold text-4xl text-center text-indigo-700 mb-8">
          Secure Checkout
        </h2>
        <form onSubmit={formik.handleSubmit} className="max-w-2xl mx-auto bg-white shadow-2xl rounded-xl p-10">
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-indigo-600 focus:outline-none focus:ring-0 peer"
              placeholder=" "
            />
            <label
              htmlFor="details"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-indigo-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Details
            </label>
            {formik.errors.details && formik.touched.details ? (
              <div className="p-4 text-red-800 rounded-lg bg-red-50 text-md text-center mt-3">
                {formik.errors.details}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-indigo-600 focus:outline-none focus:ring-0 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-indigo-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
            {formik.errors.phone && formik.touched.phone ? (
              <div className="p-4 text-red-800 rounded-lg bg-red-50 text-md text-center mt-3">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-indigo-600 focus:outline-none focus:ring-0 peer"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-indigo-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City
            </label>
            {formik.errors.city && formik.touched.city ? (
              <div className="p-4 text-red-800 rounded-lg bg-red-50 text-md text-center mt-3">
                {formik.errors.city}
              </div>
            ) : null}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-indigo-700 hover:from-green-600 hover:to-indigo-800 text-white font-bold py-3 rounded-lg transition"
            >
              {isLoading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Checkout"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
