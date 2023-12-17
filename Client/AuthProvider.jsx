// Client/AuthProvider.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const localUserData = localStorage.getItem("userData");
  console.log(localUserData);
  console.log(currentUser);

  useEffect(() => {
    // Check localStorage first
    if (localUserData) {
      setCurrentUser(JSON.parse(localUserData));
    } else {
      // If not found in localStorage, verify with server
      const verifyUser = async () => {
        try {
          const { data, status } = await axios.get(
            "http://localhost:8000/Customers/verifyCustomer",
            {
              withCredentials: true,
            }
          );

          if (status === 200) {
            setCurrentUser(data);
          } else {
            console.error(
              "Error verifying user:",
              status === 401 ? "No token provided" : data
            );
            setCurrentUser(null);
          }
        } catch (error) {
          console.error("Error verifying user", error);
          setCurrentUser(null);
        }
      };

      verifyUser();
    }
  }, [localUserData]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
