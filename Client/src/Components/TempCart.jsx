import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TempCart() {
  const cartItems = useSelector((state) => {
    return state.cart.cartItems;
  });
  const itemCount = cartItems.reduce(
    (count, curItem) => count + curItem.quantity,
    0
  );

  const navigate = useNavigate();
  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="ProductCard">
      <div className="products-container">
        <p>Cart: {itemCount}</p>
        <button type="button" onClick={goToCart}>
          Go To Cart!
        </button>
      </div>
    </div>
  );
}

export default TempCart;
