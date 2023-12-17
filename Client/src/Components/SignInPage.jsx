// SignInPage
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../Store/Actions/userActions";

function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const [loginMode, setLoginMode] = useState("customer");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleLoginMode = () => {
    setLoginMode((prevMode) =>
      prevMode === "customer" ? "admin" : "customer"
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const ToSignUp = () => {
    navigate("/SignUpPage");
  };

  const login = async () => {
    let endpoint;
    let data;

    if (loginMode === "admin") {
      endpoint = "http://localhost:8000/users";
      data = { username, email };
    } else {
      endpoint = "http://localhost:8000/Customers/login";
      data = { username, password };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.status === 200) {
        const user = await response.json();
        console.log(`${loginMode} login successful:`, user);
        completeLogin(user, loginMode);
      } else {
        window.alert("Access Denied. \nPlease check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      window.alert("An error occurred. Please try again.");
    }
  };

  const completeLogin = (user, userType) => {
    const standardizedEntity = {
      ...user,
      id: user.user.id || user.user._id,
    };
    window.alert(
      `Login Successful! \nWelcome, ${standardizedEntity.user.username}!`
    );
    localStorage.setItem("userType", userType);
    localStorage.setItem("userData", JSON.stringify(standardizedEntity));
    dispatch(loginUser(standardizedEntity.user));
    navigate("/HomePage");
  };

  return (
    <div className="signInPage">
      <button type="button" onClick={toggleLoginMode}>
        {loginMode === "customer" ? "I Am Admin" : "I Am Customer"}
      </button>
      <br />
      <br />

      {/* Login form */}
      <form onSubmit={handleSubmit}>
        {/* Render username and email inputs when in 'admin' mode */}
        {loginMode === "admin" && (
          <>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </label>
            <br />
          </>
        )}

        {/* Render username and password inputs when in 'customer' mode */}
        {loginMode === "customer" && (
          <>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
            <br />
          </>
        )}
        <br />
        <button type="submit">Log in</button>
      </form>

      {/* Option to navigate to the Sign Up page */}
      <div className="signUpSection">
        <p>Don`t have an account? </p>
        <button onClick={ToSignUp}>Sign Up</button>
      </div>
    </div>
  );
}

export default SignInPage;
