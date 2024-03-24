import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchCard from "./searchCard";
import { getProductList } from "../utils";

function Searched() {
  const [products, setProducts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const parsedSearch = new URLSearchParams(search);
    const queryParams = parsedSearch.get("q");

    if (queryParams) setProducts(getProductList(queryParams));
    else setProducts([]);
  }, [search]);

  return (
    <div className="max-w-screen-lg text-center px-8 pb-6 max-sm:mt-10 mx-auto space-y-4">
      {products.length >= 1 && (
        <Link
          className="text-start block text-sm hover:text-red-500 w-fit"
          to="/"
        >
          Clear Results
        </Link>
      )}
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <SearchCard key={product.id} item={product} {...product} clickable />
        ))}
      </div>
    </div>
  );
}

export default Searched;
