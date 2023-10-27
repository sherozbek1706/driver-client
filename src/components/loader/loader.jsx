import "./loader.css";
export const Loader = ({ still }) => {
  return (
    <div className={`Loader ${still}`}>
      <span className="loader"></span>
    </div>
  );
};
