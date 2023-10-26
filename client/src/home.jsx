import React, { useState, useEffect } from "react";
import Header from "./partials/header";
import Footer from "./partials/footer";
import { Link } from "react-router-dom";
("use client");

function Home() {
  const [datas, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function products() {
      try {
        const response = await fetch(`http://127.0.0.1:8000`);
        if (!response.ok) {
          throw new Error("Network error");
        }
        const result = await response.json();
        console.log("these");
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    products(); // Invoke the function
  }, []);

  const addToCart = async (productId) => {
    try {
      const user_id = 1; // Replace with your user ID

      // Check if the user has an existing cart
      const response = await fetch(`http://127.0.0.1:8000/carts/${user_id}`);
      let cartId;

      if (response.ok) {
        const cartData = await response.json();
        cartId = cartData.cart_id;
      } else {
        // Create a new cart if the user doesn't have one
        const createCartResponse = await fetch("/api/carts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id, productId }),
        });

        if (createCartResponse.ok) {
          const createCartData = await createCartResponse.json();
          cartId = createCartData.cart_id;
        } else {
          throw new Error("Failed to create a cart");
        }
      }

      // Add the product to the cart
      const addToCartResponse = await fetch(`/api/carts/${cartId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (addToCartResponse.ok) {
        // Success handling
        console.log("Product added to cart successfully");
      } else {
        // Error handling
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      // Error handling
      console.error("An error occurred:", error);
    }
  };

  // Invoke the function to add the product to the cart

  console.log(datas);
  return (
    <div
      style={{
        backgroundColor: "#F5FFFA",
        margin: 0,
      }}
    >
      <form
        className="mt-7 max-w-lg mx-auto"
        onChange={(e) => setSearch(e.target.value)}
      >
        <label
          for="search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Filter Here...."
            required
          ></input>
        </div>
      </form>
      <Link to="/cart">cart</Link>
      <Header />
      <div
        className="mt-12"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* Partition 1: Category 1 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "100px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {datas
              .filter(
                (data) =>
                  (search.toLowerCase() === "" ||
                    data.category?.toLowerCase().includes(search)) &&
                  data.category === "shoe"
              )
              .map((data) => (
                <div class="bg-white shadow-md rounded-lg max-w-sm max-h-sm dark:bg-gray-800 dark:border-gray-700">
                  <Link to={`/product/${data.id}`}>
                    <img
                      class="rounded-t-sm p-6 h-full object-cover w-full"
                      style={{
                        maxWidth: "400px", // Adjust the maxWidth if needed
                        maxHeight: "350px",
                        // Adjust the maxHeight if needed
                      }}
                      src={data.image_url}
                      alt="product image"
                    />
                  </Link>
                  <div class="px-5 pb-5">
                    <a href="#">
                      <h3 class="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                        {data.title.length > 8
                          ? data.title.slice(0, 8) + "..."
                          : data.title}
                      </h3>
                    </a>

                    <div class="flex items-center mt-2.5 mb-5">
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                        5.0
                      </span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-3xl font-bold text-gray-900 dark:text-white">
                        {data.price}
                      </span>
                      <a
                        href="#"
                        onClick={addToCart(data.id)}
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Link
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "100px",
          }}
          to={`/category/shoe`}
        >
          <h1 style={{ fontSize: "20px", marginBottom: "5px", color: "blue" }}>
            View All
          </h1>
        </Link>
        {/* banner */}
        <div
          class="w-full bg-cover bg-center"
          style={{
            height: "40rem",
            backgroundImage: "url(http://source.unsplash.com/kyD7I53MEuE)",
          }}
        >
          <div class="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
            <div class="text-center">
              <h1 class="text-white text-2xl font-semibold uppercase md:text-3xl">
                Build Your new <span class="underline text-blue-400">Saas</span>
              </h1>
              <button class="mt-4 px-4 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                Start project
              </button>
            </div>
          </div>
        </div>
        {/* Partition 2: Category 2 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "100px",
          }}
        >
          <h2>clothes</h2>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {datas
              .filter(
                (data) =>
                  (search.toLowerCase() === "" ||
                    data.category?.toLowerCase().includes(search)) &&
                  data.category === "clothes"
              )
              .map((data) => (
                <div class="bg-white shadow-md rounded-lg max-w-sm max-h-sm dark:bg-gray-800 dark:border-gray-700 mr-8 w-full">
                  <Link to={`/product/${data.id}`}>
                    <img
                      class="rounded-t-sm p-6 h-full object-cover w-full"
                      style={{
                        maxWidth: "400px", // Adjust the maxWidth if needed
                        maxHeight: "350px",
                        // Adjust the maxHeight if needed
                      }}
                      src={data.image_url}
                      alt="product image"
                    />
                  </Link>
                  <div class="px-5 pb-5">
                    <a href="#">
                      <h3 class="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                        {data.title.length > 8
                          ? data.title.slice(0, 8) + "..."
                          : data.title}
                      </h3>
                    </a>

                    <div class="flex items-center mt-2.5 mb-5">
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                        5.0
                      </span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-3xl font-bold text-gray-900 dark:text-white">
                        {data.price}
                      </span>
                      <a
                        href="#"
                        onClick={addToCart(data.id)}
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Link
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "100px",
          }}
          to={`/category/clothes`}
        >
          <h1 style={{ fontSize: "20px", marginBottom: "16px", color: "blue" }}>
            View All
          </h1>
        </Link>
        {/* banner */}
        <div
          class="w-full bg-cover bg-center"
          style={{
            height: "40rem",
            backgroundImage: "url(http://source.unsplash.com/g2KTwzo3-MQ)",
          }}
        >
          <div class="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
            <div class="text-center">
              <h1 class="text-white text-2xl font-semibold uppercase md:text-3xl">
                Build Your new <span class="underline text-blue-400">Saas</span>
              </h1>
              <button class="mt-4 px-4 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                Start project
              </button>
            </div>
          </div>
        </div>
        {/* Partition 3: Category 3 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "100px",
          }}
        >
          <h2>bag</h2>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {datas
              .filter(
                (data) =>
                  (search.toLowerCase() === "" ||
                    data.category?.toLowerCase().includes(search)) &&
                  data.category === "bag"
              )
              .map((data) => (
                <div class="bg-white shadow-md rounded-lg max-w-sm max-h-sm dark:bg-gray-800 dark:border-gray-700 w-full mr-5">
                  <Link to={`/product/${data.id}`}>
                    <img
                      class="rounded-t-sm p-6 h-full object-cover w-full"
                      style={{
                        maxWidth: "400px", // Adjust the maxWidth if needed
                        maxHeight: "350px",
                        // Adjust the maxHeight if needed
                      }}
                      src={data.image_url}
                      alt="product image"
                    />
                  </Link>
                  <div class="px-5 pb-5">
                    <a href="#">
                      <h3 class="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                        {data.title.length > 8
                          ? data.title.slice(0, 8) + "..."
                          : data.title}
                      </h3>
                    </a>

                    <div class="flex items-center mt-2.5 mb-5">
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                        5.0
                      </span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-3xl font-bold text-gray-900 dark:text-white">
                        {data.price}
                      </span>
                      <a
                        href="#"
                        onClick={addToCart(data.id)}
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Link
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "100px",
          }}
          to={`/category/bag`}
        >
          <h1 style={{ fontSize: "20px", marginBottom: "16px", color: "blue" }}>
            View All
          </h1>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
