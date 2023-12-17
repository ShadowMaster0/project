import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, decreaseQuantity } from "../Store/Actions/cartActions";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchedUser = JSON.parse(localStorage.getItem("userData"));
  const cartItems = useSelector((state) => state.cart.cartItems);

  const itemCount = cartItems.reduce(
    (count, curItem) => count + curItem.quantity,
    0
  );
  const totalCost = cartItems.reduce(
    (total, curItem) => total + curItem.price * curItem.quantity,
    0
  );

  const cancel = () => {
    navigate("/HomePage");
  };

  const buy = async (e) => {
    e.preventDefault();
    let allApiCallsSuccessful = true;
    let purchasedItems = [];

    for (const product of cartItems) {
      const currentCustomer = {
        customers: [
          {
            name: fetchedUser.user.name,
            email: fetchedUser.user.email,
          },
        ],
      };

      const productData = {
        name: product.name,
        price: +product.price,
        date: new Date(),
      };

      const purchaseData = {
        customerName: fetchedUser.user.name,
        productName: product.name,
        price: product.price,
        customerId: fetchedUser.user.id,
        productId: product._id,
        date: new Date().toISOString(),
        quantity: product.quantity,
      };
      console.log("purchaseDATA", purchaseData);

      try {
        const resProduct = await axios.put(
          `http://localhost:8000/Products/${product._id}`,
          currentCustomer
        );
        console.log(resProduct.status);
      } catch (error) {
        console.error("Error while making the PUT request to Products:", error);
        allApiCallsSuccessful = false;
      }

      try {
        const resCustomer = await axios.put(
          `http://localhost:8000/Customers/${fetchedUser.user._id}/purchases`,
          {
            purchases: [productData],
          }
        );
        console.log(resCustomer.status);
      } catch (error) {
        console.error("Error while making the PUT request to Customer:", error);
        allApiCallsSuccessful = false;
      }

      try {
        const resPurchase = await axios.post(
          "http://localhost:8000/Purchases",
          purchaseData
        );

        console.log(resPurchase.status);
        purchasedItems.push(purchaseData);

        dispatch(decreaseQuantity(product._id));
      } catch (error) {
        console.error("Error while making the PUT request to Purchase:", error);
        allApiCallsSuccessful = false;
        break;
      }
    }
    if (allApiCallsSuccessful) {
      completePurchase(purchasedItems);
    }
    if (cartItems.length === 0) {
      dispatch(clearCart());
    }
    navigate("/CompletePurchasePage");
  };

  const completePurchase = (purchasedItems) => {
    localStorage.setItem("purchase", JSON.stringify(purchasedItems));
    console.log(localStorage.getItem("purchase"));
  };

  const onClickRemoveProduct = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  return (
    <div>
      <p>Cart: {itemCount}</p>
      <div>
        {cartItems.map((product) => (
          <div key={product._id}>
            <div className="Product">
              <h2>
                <Link to={`/product/${product._id}`}>{product.name}</Link>
              </h2>
              <div>{product.img}</div>
              <label> price: {product.price}$</label>
            </div>
            <div className="ProductBar"></div>
            <label> description: {product.description}</label>
            <label> quantity: {product.quantity}</label>
            <br />
            <button
              type="button"
              onClick={() => onClickRemoveProduct(product._id)}
            >
              Remove this Item
            </button>
            <br />
          </div>
        ))}
      </div>
      <br />
      <br />
      <span>Total Cost: {totalCost}$</span>
      <br />
      <br />
      <button onClick={buy}>I Want To Buy!</button>
      <button onClick={cancel}>Back to Home Page</button>
    </div>
  );
};

export default Cart;