import { useEffect, useState } from "react";
import { info_notify, success_notify } from "../../shared";
import "./bar.css";
import { lotinKirilOtkazish } from "../../utils/functions/lotin-kiril";
export const handleBar = () => {
  const bar = document.querySelector(".Bar");
  bar.classList.toggle("sticky");
};

export const Bar = () => {
  const [lang, setLang] = useState("lotin");

  useEffect(() => {
    let elLang = localStorage.getItem("language");
    if (!elLang) {
      localStorage.setItem("language", "lotin");
    } else {
      setLang(elLang);
    }
  }, []);

  const handleChangeLang = (e) => {
    setLang(e.target.value);
    localStorage.setItem("language", e.target.value);
    success_notify("Alifbo o'zgartirildi!");
    setTimeout(() => {
      window.location.assign("/");
    }, 1000);
  };

  const onClickLogOutBtn = () => {
    info_notify("Tizimdan chiqdingiz!");
    Object.keys(localStorage.getItem()).forEach((cookieName) => {
      localStorage.removeItem(cookieName);
    });
    setTimeout(() => {
      window.location.assign("/");
    }, 1000);
  };

  return (
    <div className="Bar">
      <header>
        <h2>Driver Plus</h2>
        <i className="fa-solid fa-xmark icon" onClick={handleBar}></i>
      </header>
      <section>
        <select
          value={lang}
          className="Bar_selection_lang"
          onChange={(e) => handleChangeLang(e)}
        >
          <option value="kiril">{lotinKirilOtkazish("Kiril")}</option>
          <option value="lotin">{lotinKirilOtkazish("Lotin")}</option>
        </select>
        <button className="Bar__button" onClick={onClickLogOutBtn}>
          <i className="fa-solid fa-right-from-bracket icon"></i>
          {lotinKirilOtkazish("Tizimdan Chiqish")}
        </button>
      </section>
    </div>
  );
};
