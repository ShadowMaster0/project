// HomePage
import { useState } from "react";
import Products from "./Products";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom"; // Removed useNavigate from this component
import Logout from "./logout"; // Use lowercase 'logout' instead of 'Logout'
import "../../css/HomePage.css";

function HomePage() {
  const [productName, setProductName] = useState("");
  const userType = localStorage.getItem("userType");
  const fetchedUser = JSON.parse(localStorage.getItem("userData"));
  console.log(fetchedUser);

  return (
    <div className="container">
      <div className="header">
        {userType === "customer" && (
          <Link to={`/PersonalPage/${fetchedUser.user._id}`}>
            <button>Profile</button>
          </Link>
        )}
      </div>
      <Logout />
      <h1> Home Page</h1>
      <div className="admin-links">
        {userType === "admin" && <Link to={`/Customers`}>Customers</Link>}
        <br />
        {userType === "admin" && (
          <Link to={`/ProductsList`}>Products List</Link>
        )}
      </div>
      <div className="nav">
        <SearchBar productName={productName} setProductName={setProductName} />
        <Navbar />
        <Products productName={productName} />
      </div>
    </div>
  );
}

export default HomePage;
