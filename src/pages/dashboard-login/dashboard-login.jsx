import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAdmin, error_notify, success_notify } from "../../shared";
import "./dashboard-login.css";
export const DashboardLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const driver = { username, password };

    axiosAdmin
      .post("/admin/login", driver)
      .then(({ data: { data } }) => {
        localStorage.setItem("admin_token", data);
        const decode = jwt_decode(data);
        localStorage.setItem("role", decode.user.role);
        success_notify("Login qildingiz!");
        window.location.assign("/dashboard");
      })
      .catch(({ response: { data } }) => {
        error_notify(data.error);
      });
  };

  return (
    <div className="DashboardLogin">
      <div className="form-wrapper">
        <h2>Admin Login</h2>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="form-control">
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Login</label>
          </div>
          <div className="form-control">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};
