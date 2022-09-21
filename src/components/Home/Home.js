import GetBooks from "../../Api/Api";
import Filters from "../Filter/Filters";
import { CartState } from "../../context/Context";
import SingleProduct from "../SingleProduct/SingleProduct";
import { useEffect } from "react";
const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byRating, searchQuery, category },
    dispatch,
  } = CartState();

  const setBooks =  async (data) => {
    await dispatch({
      type: "GET_BOOKS",
      payload: data,
    });
  };

  useEffect(async () => {
    await GetBooks(setBooks);
  }, []);

  // useEffect(() => {}, [sort, byStock, byRating, searchQuery]);
  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (category) {
      sortedProducts = sortedProducts.filter(
        (prod) => parseInt(prod.category) == category
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.rating >= byRating);
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod) => (
          <SingleProduct prod={prod} key={prod._uuid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
