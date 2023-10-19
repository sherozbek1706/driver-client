import "./header.css";
// import { useContext } from "react";
// import { lotinKirilOtkazish } from "../../utils/functions/lotin-kiril";
// import { Context } from "../../App";
export const Header = ({ title }) => {
  // const data = useContext(Context);

  return (
    <div className="Header">
      <h1 className="Header__title">
        {/* {data.lang == "kiril" ? lotinKirilOtkazish(title) : title} */}
        {title}
      </h1>
    </div>
  );
};
