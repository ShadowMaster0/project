import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./src/Store/Actions/userActions";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userType = localStorage.getItem("userType");
  const user = useSelector((state) => state.user.user);

  const getEndpoint = (type) => {
    switch (type) {
      case "admin":
        return "http://localhost:8000/users/verify";
      case "customer":
        return "http://localhost:8000/Customers/verify";
      default:
        throw new Error("Unknown user type");
    }
  };

  const refreshTokenEndpoint = (type) => {
    switch (type) {
      case "admin":
        return "http://localhost:8000/users/token";
      case "customer":
        return "http://localhost:8000/Customers/token";
      default:
        throw new Error("Unknown user type");
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const endpoint = getEndpoint(userType);

        const { data, status } = await axios.get(endpoint, {
          withCredentials: true,
        });

        if (status === 200 && data.user) {
          setCurrentUser(data.user);
          dispatch(loginUser(data.user));
        } else if (data.error === "Token expired") {
          const refreshEndpoint = refreshTokenEndpoint(userType);
          const refreshResponse = await axios.post(
            refreshEndpoint,
            {},
            {
              withCredentials: true,
            }
          );

          if (refreshResponse.status === 200) {
            const newAccessToken = refreshResponse.data.accessToken;
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            // Retry verification with the new access token
            verifyUser();
          } else {
            throw new Error("Failed to refresh token");
          }
        } else {
          console.error(
            "Error verifying user:",
            status === 401 ? "No token provided" : data
          );
          setCurrentUser(null);
          navigate("/SignInPage");
        }
      } catch (error) {
        console.error("Error during verification API call:", error);
        setCurrentUser(null);
        navigate("/SignInPage");
      }
    };

    if (!user) {
      verifyUser();
    }
  }, [navigate, user, dispatch, userType]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
      <Outlet />
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
