import { useEffect } from "react";
import { Header } from "../../components";
import { Sitebar } from "../../layouts";
import "./home.css";
import Cookies from "js-cookie";
export const Home = () => {
  // useEffect(() => {
  //   Object.keys(Cookies.get()).forEach(function (cookieName) {
  //     Cookies.remove(cookieName);
  //   });
  // }, []);
  return (
    <div className="Home">
      <Header title={"Bosh Sahifa"} />
      <Sitebar />
    </div>
  );
};
