import { useDispatch } from "react-redux";
import { addProductToCart } from "../Store/Actions/cartActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../css/Product.css";

function Product({ product }) {
  const dispatch = useDispatch();

  const onAddProduct = () => {
    dispatch(addProductToCart(product));
  };

  return (
    <div className="product">
      <div>
        <h2>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h2>
        {/*
        <div className="logo">{product.img}</div>{" "}
        {/* Applying .logo class here */}
        <label>price: {product.price}$</label>
      </div>
      <div className="ProductBar"></div>
      <label>description: {product.description}</label>
      <br />
      <button onClick={onAddProduct}>Add</button>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
