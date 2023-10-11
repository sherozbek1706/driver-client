import "./login.css";
export const Login = () => {
  return (
    <div className="LoginPage">
      <div class="form-wrapper">
        <h2>Login</h2>
        <form action="#">
          <div class="form-control">
            <input type="text" required />
            <label>Login</label>
          </div>
          <div class="form-control">
            <input type="password" required />
            <label>Password</label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
