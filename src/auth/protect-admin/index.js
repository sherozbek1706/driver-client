import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectRouteAdmin = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const token = Cookies.get("admin_token");
      const role = Cookies.get("role");
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
