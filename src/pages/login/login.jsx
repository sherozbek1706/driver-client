import { useState } from "react";
import "./login.css";
import { axiosInstance, error_notify, success_notify } from "../../shared";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const driver = { username, password };

    axiosInstance
      .post("/driver/login", driver)
      .then(({ data: { data } }) => {
        Cookies.set("token", data);
        const decode = jwt_decode(data);
        Cookies.set("role", decode.user.role);
        success_notify("Login qildingiz!");
        setTimeout(() => {
          window.location.assign("/");
        }, 2500);
        navigate("/");
      })
      .catch(({ response: { data } }) => {
        error_notify(data.error);
      });
  };

  return (
    <div className="LoginPage">
      <div className="form-wrapper">
        <h2>Login</h2>
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
