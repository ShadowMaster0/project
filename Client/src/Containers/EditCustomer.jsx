import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EditCustomer() {
  const { customerId } = useParams();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  console.log(customerId);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
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
          `http://localhost:8000/Customers/${customerId}`
        );
        if (response.status === 200) {
          const fetchedCustomer = response.data.customer;
          setName(fetchedCustomer.name || "");
          setUsername(fetchedCustomer.username || "");
          setEmail(fetchedCustomer.email || "");
          setCity(fetchedCustomer.city || "");
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
        customerInfo
      );

      if (response.status === 200) {
        console.log("Customer updated successfully");
        window.alert(`Customer updated successfully!`);
        navigate("/Customers");
      }
    } catch (error) {
      console.log("Error updating customer:", error);
    }
  };

  return (
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
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
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
  );
}

export default EditCustomer;
