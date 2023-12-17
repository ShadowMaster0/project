import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductsList = () => {
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
  return (
    <div>
      <h2>Products</h2>
      <table border={5}>
        <thead>
          <tr>
            <th>Product name</th>
            <th>Product price</th>
            <th>Product quantity</th>
            <th>Product description</th>
            <th>Product category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <Link to={`/Products/EditProduct/${product._id}`}>
                  {`${product.name}`}
                </Link>
              </td>
              <td>
                <Link to={`/Products/EditProduct/${product._id}`}>
                  {`${product.price}$`}
                </Link>
              </td>
              <td>
                <Link to={`/Products/EditProduct/${product._id}`}>
                  {`${product.quantity}`}
                </Link>
              </td>
              <td>
                <Link to={`/Products/EditProduct/${product._id}`}>
                  {`${product.description}`}
                </Link>
              </td>
              <td>
                <Link to={`/Products/EditProduct/${product._id}`}>
                  {`${product.category}`}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
