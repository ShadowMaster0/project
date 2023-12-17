import { Link, useNavigate } from "react-router-dom"; // Import Link component
import { useState, useEffect } from "react"; // Import useState and useEffect hooks

function CompletePurchasePage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const purchasedProducts = JSON.parse(localStorage.getItem("purchase")) || [];

  useEffect(() => {
    const total = purchasedProducts.reduce((acc, purchase) => {
      return acc + purchase.price * purchase.quantity;
    }, 0);
    setTotalPrice(total);
  }, [purchasedProducts]);

  const navigate = useNavigate();
  const BackToHomePage = () => {
    navigate("/HomePage")
  }

  return (
    <div>
      <h1>Thank You For Your Purchase</h1>
      <table border={5}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product price</th>
            <th>Product quantity</th>
          </tr>
        </thead>
        <tbody>
          {purchasedProducts.map((purchase) => (
            <tr key={purchase.productId}>
              <td>
                <Link to={`/product/${purchase.productId}`}>
                  {purchase.productName}
                </Link>
              </td>
              <td>
                <label>{purchase.price}$</label>
              </td>
              <td>{purchase.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <br />
        <br />
        <div>
          <strong>Total Price: {totalPrice}$</strong>
        </div>
        <div><br />
          <button onClick={BackToHomePage}>
            Back To Home Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompletePurchasePage;
