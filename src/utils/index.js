import { productList } from "../assets/data";

export const getProductList = (query) => {
  query = query.toLowerCase();

  const results = productList.filter((product) => {
    const name = product.name.toLowerCase();
    // Currently searching based on the product name
    // const desc = product.desc.toLowerCase();
    return name.includes(query); // || desc.includes(query);
  });

  // Sort results in alphabetically order by product name
  results.sort((a, b) => a.name.localeCompare(b.name));

  return results;
};

export const getProductByID = (id) => {
  const products = productList.filter((product) => product.id === id);
  if (products.length === 0) return { code: 400, message: "Product not found" };

  return {
    code: 200,
    message: "Product fetched successfully",
    data: products[0],
  };
};
