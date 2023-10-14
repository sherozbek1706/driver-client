import "./header.css";
export const Header = ({ title }) => {
  return (
    <div className="Header">
      <h1 className="Header__title">{title}</h1>
    </div>
  );
};
