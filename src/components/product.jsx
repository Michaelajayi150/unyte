import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getProductByID, getProductList } from "../utils";

function Product() {
  const [product, setProduct] = useState();
  const [comparedProduct, setComparedProduct] = useState();
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState("");
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const parsedSearch = new URLSearchParams(search);
    const compareID = parseInt(parsedSearch.get("cid"));
    const compareTID = parseInt(parsedSearch.get("tid"));

    const fetchedProduct = getProductByID(compareID);
    if (fetchedProduct.code === 200) {
      setProduct(fetchedProduct.data);

      if (compareTID) {
        setComparedProduct(getProductByID(compareTID).data);
      }
    } else {
      setError(fetchedProduct.message);
    }
  }, [search]);

  useEffect(() => {
    if (product && !comparedProduct) {
      const allProducts = getProductList("").filter(
        (item) => item.id !== product.id
      );
      setProductList(allProducts);
    }
  }, [product, comparedProduct]);

  return error ? (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <p> Couldn&apos;t find product... Please go back and search again</p>
      <Link className="text-red-400" to="/">
        Click here to go home
      </Link>
    </div>
  ) : (
    <>
      <div className="mt-8 space-y-3 w-10/12 mx-auto">
        <Link
          className="text-start text-sm hover:text-red-500 w-fit underline underline-offset-8 flex gap-1"
          to="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Back
        </Link>

        <div className="flex gap-3 items-stretch w-full">
          <div className="flex-1 space-y-3">
            <h3 className="tough-text text-lg md:text-2xl">{product?.name}</h3>
            <img
              className="w-[200px] h-[150px] lg:w-[400px] lg:h-[300px]"
              src={product?.image}
              alt={product?.name}
            />
          </div>

          <div className="w-0.5 h-auto bg-gray-900 dark:bg-white" />

          {comparedProduct ? (
            <div className="flex-1 space-y-3">
              <h3 className="tough-text text-lg md:text-2xl">
                {comparedProduct?.name}
              </h3>
              <img
                className="w-[200px] h-[150px] lg:w-[400px] lg:h-[300px]"
                src={comparedProduct?.image}
                alt={comparedProduct?.name}
              />
            </div>
          ) : (
            <div className=" lg:text-smlg:text-sm space-y-3 flex-1">
              <p>Select a product to compare </p>
              {productList.length >= 1 && (
                <div className="flex flex-col bg-gray-600 text-white dark:bg-white dark:text-black text-start overflow-y-auto max-h-[320px]">
                  {productList.map((item, index) => (
                    <Link
                      className="w-full py-2 px-4 hover:bg-gray-900 dark:hover:bg-gray-200"
                      to={`/product/compare?cid=${product?.id}&tid=${item.id}`}
                      key={(item.id * 2) / index}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {comparedProduct && (
        <>
          <div className="py-4 text-center uppercase tough-text bg-gray-900 text-white dark:bg-white dark:text-black w-full my-8">
            Comparison
          </div>
          <div className="space-y-3 w-10/12 mx-auto text-xs lg:text-sm">
            <h3>Description</h3>
            <div className="flex gap-3 items-stretch">
              <p className="flex-1">{product?.desc}</p>
              <div className="w-0.5 h-auto bg-gray-900 dark:bg-white" />
              <p className="flex-1">{comparedProduct?.desc}</p>
            </div>

            <h3>Price</h3>
            <div className="flex gap-3 items-stretch">
              <p className="flex-1">${product?.price}</p>
              <div className="w-0.5 h-auto bg-gray-900 dark:bg-white" />
              <p className="flex-1">${comparedProduct?.price}</p>
            </div>

            <h3>Tag</h3>
            <div className="flex gap-3 items-stretch">
              <ul className="flex-1 list-disc ps-6">
                {product?.tags?.map((tag, id) => (
                  <li key={tag + id}>{tag}</li>
                ))}
              </ul>
              <div className="w-0.5 h-auto bg-gray-900 dark:bg-white" />
              <ul className="flex-1 list-disc ps-6">
                {comparedProduct?.tags?.map((tag, id) => (
                  <li key={id + tag}>{tag}</li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <div
                onClick={() => {
                  setComparedProduct();
                  navigate(`/product/compare?cid=${product?.id}&tid=`);
                }}
                className="w-fit mx-auto text-white px-4 pt-2 pb-3 cursor-pointer bg-green-600 rounded"
              >
                Cancel Comparison
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Product;
