import "./dashboard-login.css";
export const DashboardLogin = () => {
  return (
    <div className="DashboardLogin">
      <h1>LOGIN ADMIN</h1>
      <form>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button>LOGIN</button>
      </form>
    </div>
  );
};
