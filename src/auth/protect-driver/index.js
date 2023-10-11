import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectRouteDriver = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const userRole = decoded.user.role;

      if (userRole !== "driver") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error decoding JWT:", error);
      navigate("/login");
    }
  }, [navigate]);

  return children;
};
