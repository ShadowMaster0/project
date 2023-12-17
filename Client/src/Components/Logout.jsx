import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8000/Customers/logout",
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/SignInPage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default Logout;