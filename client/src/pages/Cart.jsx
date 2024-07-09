/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect } from "react";
import { cartbook } from "./cartbookin"; //pruthvij bookings

const Cart = ({ cart, setCart }) => {
  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get("/api/v1/cart/mycart");
        //console.log(response);
        setCart(response.data.data.data.items);
        //console.log("cart ", cart);
      } catch (error) {
        //console.log(error);
      }
    };
    getCart();
  }, []);
  const removeFromCart = async (itemId) => {
    try {
      const res = await axios.delete(`/api/v1/cart/${itemId}`);
      if (res.status === 200) {
        // Remove the item from the cart state
        const updatedCart = cart.filter((item) => item.crop.id !== itemId);
        setCart(updatedCart);
      }
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const crops = urlParams.getAll("crop").join(",");
    const users = urlParams.getAll("user").join(",");
    const prices = urlParams.getAll("price").join(",");

    console.log("crops cart", crops);
    console.log("user cart", users);
    console.log("price cart", prices);

    // Send the data to backend when component mounts
    if (crops.length > 0 && users.length > 0 && prices.length > 0) {
      axios
        .get(
          `/api/v1/bookings/cart?crops=${crops}&users=${users}&prices=${prices}`
        )
        .then(() => {
          // After making the API call, remove all query parameters and redirect
          window.location.href = "http://localhost:5173/crops";
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors if needed
        });
    }
  }, []);

  // http://localhost:5173/cart/?crop=661ec7c1bebaefafb08992b1&user=660d3f5a4254ad8c4785f83b&price=600&&crop=661ec8f0bebaefafb08992bc&user=660d3f5a4254ad8c4785f83b&price=228&&crop=661ec96bbebaefafb08992be&user=660d3f5a4254ad8c4785f83b&price=230
  // const cartbook = async () => {
  //   try {
  //     // Call your cartbook function here
  //     await cartbook();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleCheckout = async () => {
    try {
      await cartbook();
      // const response = await axios.get("/api/v1/bookings/checkoutforcart");
      // console.log("checkout ", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="h-full overflow-y-auto bg-gray-100 pt-2"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      <div className="h-full bg-gray-100 pt-2">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cart.length > 0 ? (
              cart.map((i) => (
                <>
                  <div
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                    key={i.crop.id}
                  >
                    <img
                      src={i.crop.image}
                      className="w-1/2 rounded-lg sm:w-20"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {i.crop.name}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">
                          {i.crop.type}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">{i.price}</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            onClick={() => removeFromCart(i.crop.id)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <h1>No items in cart</h1>
            )}
          </div>
          {/* Sub total */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">
                {cart.reduce((acc, item) => acc + item.price, 0)}
              </p>
            </div>
            {/* <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div> */}
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  {cart.reduce((acc, item) => acc + item.price, 0)}
                </p>
                <p className="text-sm text-gray-700 ">including GST</p>
              </div>
            </div>
            <button
              className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              onClick={handleCheckout}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
