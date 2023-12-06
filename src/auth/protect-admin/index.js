import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectRouteAdmin = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const token = localStorage.getItem("admin_token");
      const role = localStorage.getItem("role");
      const decoded = jwt_decode(token);
      const userRole = decoded.user.role;

      //if (userRole !== "admin" && userRole !== "super_admin") {
      // navigate("/dashboard/login");
      //}
    } catch (error) {
      navigate("/dashboard/login");
    }
  }, [navigate]);

  return children;
};
