import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/ProfilePage.css";

function PersonalPage() {
  const { customerId } = useParams();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [purchases, setPurchases] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/Customers/${customerId}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          const fetchedCustomer = response.data.customer;
          setName(fetchedCustomer.name || "");
          setUsername(fetchedCustomer.username || "");
          setEmail(fetchedCustomer.email || "");
          setCity(fetchedCustomer.city || "");
          setPurchases([...fetchedCustomer.purchases]);
        }
      } catch (error) {
        console.log("Error fetching customer data:", error);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerInfo = {
      name,
      username,
      email,
      city,
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/Customers/${customerId}`,
        customerInfo,
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Customer updated successfully");
        window.alert(`Customer updated successfully!`);
      }
    } catch (error) {
      console.log("Error updating customer:", error);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <div className="EditCustomer">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
                className="form-input"
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="form-input"
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              City:
              <input
                type="text"
                name="city"
                value={city}
                onChange={handleCityChange}
                className="form-input"
              />
            </label>
          </div>

          <button type="submit" className="submit-button">
            Update
          </button>
        </form>
      </div>
      <div>
        <h2>Previous Orders</h2>
        {purchases.map((purchase) => (
          <div key={purchase._id}>
            <div className="Product">
              <label>{purchase.name}</label>
              <label> price: {purchase.price}$</label>
            </div>
            <div className="ProductBar"></div>
            <br />
          </div>
        ))}
      </div>
      <div>
        <br />
        <br />
        <br />
        <Link to={`/HomePage`}>
          <button>Go Back Home</button>
        </Link>
      </div>
    </div>
  );
}

export default PersonalPage;
