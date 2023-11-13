import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  axiosInstance,
  errorHandler,
  error_notify,
  success_notify,
  warning_notify,
} from "../../shared";
import "./login.css";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reacaptcha, setReacaptcha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // if (!reacaptcha) {
    //   warning_notify("Siz recaptchani to'ldirmagansiz!");
    //   return;
    // }

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
        }, 500);
      })
      .catch((error) => {
        error_notify(error?.response?.data?.error);
        errorHandler(error);
      });
  };

  const recapcha = (e) => {
    setReacaptcha(e);
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
          <ReCAPTCHA
            sitekey="6Le8W8woAAAAAFfM4WMufyJFujP5JpyXdgHOK3m6"
            onChange={(e) => recapcha(e)}
          />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};
