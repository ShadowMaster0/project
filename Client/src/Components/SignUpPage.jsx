import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Sign.css";

function SignUpPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  //const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

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

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const checkIfUserExists = async () => {
    try {
      const response = await fetch("http://localhost:8000/Customers");
      const customerList = await response.json();
      return customerList.customers.some(
        (customer) => customer.username === username || customer.email === email
      );
    } catch (error) {
      console.error("Error checking user:", error);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userExists = await checkIfUserExists();
    if (userExists) {
      window.alert("Username or Email already taken.");
      return;
    }

    register();
  };

  const register = async () => {
    try {
      const loginInfo = {
        name,
        username,
        email,
        city,
        password,
      };

      const responseCustomers = await fetch(
        "http://localhost:8000/Customers/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginInfo),
        }
      );
      console.log(loginInfo);
      if (responseCustomers.status === 201) {
        /*Check for 201 instead of 200
        const customer = await responseCustomers.json();
        console.log("Parsed customer response:", customer);
        completeLogin(customer)*/
      } else {
        window.alert("Registration failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      window.alert(
        "An error occurred during registration. Please try again later."
      );
    }
    navigate("/");
  };

  /*const completeLogin = (customer) => {
    const standardizedEntity = {
      ...customer,
      id: customer.id || customer._id,
    };
    localStorage.setItem("customer", JSON.stringify(standardizedEntity));
    setLoggedInUser(standardizedEntity.name);
    window.alert(
      `Registration Successful! \nWelcome, ${standardizedEntity.name}!`
    );
    navigate("/"); // Navigate to Sign In Page after successful registration
  };*/

  const backToLogin = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Sign Up Now</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Full Name:
          <input
            type="text"
            name="FullName"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <br />
        <label>
          Enter Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label>
          Enter Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <br />
        <label>
          Enter City:
          <input
            type="text"
            name="city"
            value={city}
            onChange={handleCityChange}
          />
        </label>
        <br />
        <label>
          Enter Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit" value="Submit">
          Sing Up
        </button>
        <br />
        <br />
        <label>Already have account?</label>
        <button onClick={backToLogin}>login</button>
      </form>
      <p>{username ? `Welcome, ${username}` : ""}</p>
    </div>
  );
}

export default SignUpPage;
