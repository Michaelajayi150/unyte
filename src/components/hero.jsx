import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import { getProductList } from "../utils";

function Hero() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const inputTab = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input === "") {
      inputTab.current.focus();
    } else {
      navigate(`/search?q=${input}`);
    }
  };

  useEffect(() => {
    const products = getProductList(input);
    if (input !== "") setSuggestions(products);
    else setSuggestions([]);
  }, [input]);

  return (
    <div className="w-full h-[70vh] flex items-center justify-center">
      <div className="space-y-6 max-w-screen-md text-center px-8 max-sm:mt-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tough-text">
          Search for your favorite, customized, <br /> and fashionable products.
        </h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
          incidunt suscipit blanditiis tenetur praesentium velit vel molestiae
          voluptatibus, ab minima hic facilis fuga, recusandae unde.
        </p>

        <form
          className="relative flex items-center max-w-sm mx-auto group"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={input}
            ref={inputTab}
            className="flex-1 py-4 px-8 text-xs outline-0 border dark:border-0 peer"
            onChange={(e) => setInput(e.target.value)}
            onInput={(e) => setInput(e.target.value)}
            onFocus={(e) => setInput(e.target.value)}
            // onBlur={() => setSuggestions([])}
            placeholder="Search for a product"
          />
          <BsIcons.BsSearch className="absolute left-3" size=".9rem" />
          <button
            name="search"
            className="bg-blue-400 text-white p-4"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
          {suggestions.length >= 1 && (
            <div className="absolute flex flex-col bg-gray-600 text-white dark:bg-white dark:text-black max-w-sm w-full mx-auto text-start overflow-y-auto max-h-[200px] text-xs top-full z-10 duration-500 opacity-0 invisible peer-focus:visible peer-focus:opacity-100">
              {suggestions.map((product, index) => (
                <Link
                  onClick={() => setInput("")}
                  className="w-full py-2 px-4 hover:bg-gray-900 dark:hover:bg-gray-200"
                  to={`/search?q=${product.name}`}
                  key={product.id + index + product.name}
                >
                  {product.name}
                </Link>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Hero;
