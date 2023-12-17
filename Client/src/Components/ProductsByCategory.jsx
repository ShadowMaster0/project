import { useParams } from "react-router-dom";
import Product from "./Product";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import TempCart from "./TempCart";
import axios from "axios";

function ProductsByCategory() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");

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

  const productsInCategory = products.filter(
    (product) =>
      product.category === categoryName &&
      (productName === "" ||
        product.name.toLowerCase().includes(productName.toLowerCase()))
  );

  return (
    <div>
      <SearchBar productName={productName} setProductName={setProductName} />
      <Navbar />
      {productsInCategory.map((product) => (
        <Product key={product._id} value={product._id} product={product} />
      ))}
      <div>
        <TempCart />
      </div>
    </div>
  );
}

export default ProductsByCategory;
