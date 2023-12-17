import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import TempCart from "./TempCart";
import axios from "axios";

const Products = ({ productName = "" }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/Products");
        if (res.status === 200) {
          setProducts(res.data.products);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      productName === "" ||
      product.name.toLowerCase().includes(productName.toLowerCase())
  );

  return (
    <div className="ProductsCard">
      {filteredProducts.map((product) => (
        <Product key={product._id} product={product} />
      ))}
      <div>
        <TempCart />
      </div>
    </div>
  );
};

Products.propTypes = {
  productName: PropTypes.string,
};

export default Products;
