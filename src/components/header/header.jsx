import "./header.css";
import { handleBar } from "../../layouts/bar/bar";
import { useState } from "react";
import { useContext } from "react";
import { lotinKirilOtkazish } from "../../utils/functions/lotin-kiril";
import { Context } from "../../App";
export const Header = ({ title }) => {
  const [icon, setIcon] = useState();
  const data = useContext(Context);

  const handleTargetBar = () => {
    handleBar();
  };

  return (
    <div className="Header">
      <h1 className="Header__title">
        {data.lang == "kiril" ? lotinKirilOtkazish(title) : title}
        {/* {title} */}
      </h1>
      <i className="fa-solid fa-bars icon" onClick={handleTargetBar}></i>
    </div>
  );
};
