import { Fragment, useEffect, useState } from "react";
import { Header, Loader, NoActive } from "../../components";
import { Sitebar } from "../../layouts";
import done_ringtong from "../../assets/music/done.mp3";
import "./driver-order.css";
import { errorHandler } from "../../shared/handler/errors";
import { error_notify, success_notify } from "../../shared/notify";
import { axiosInstance } from "../../shared";
import bcryptjs from "bcryptjs";
import { useNavigate, useParams } from "react-router-dom";
import { NotFound } from "../notfound/notfound";
import { socket } from "../../App";
import { lotinKirilOtkazish } from "../../utils/functions/lotin-kiril";
export const DriverOrder = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [notfound, setNotfound] = useState(false);

  const { id: params } = useParams();
  const navigate = useNavigate("");

  useEffect(() => {
    compare();
    if (!notfound) {
      setLoading(true);
      fetchData();
    }
  }, [notfound]);

  const changeNotFound = () => {
    setNotfound(true);
  };
  const compare = async () => {
    const hashed = params.split("sHeRoZbek")[0];
    const id = params.split("sHeRoZbek")?.[1]?.split("$")?.[0];

    const compare = await bcryptjs.compare(id || "", hashed);

    if (!compare) {
      setNotfound(true);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    if (!notfound) {
      try {
        const response = await axiosInstance.get("/driver-order");

        if (response.status == 200) {
          setData(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        errorHandler(error, changeNotFound);
        setLoading(false);
      }
    }
  };

  const handleHandOver = async (id) => {
    try {
      setLoading(true);
      const audio = new Audio(done_ringtong);
      const response = await axiosInstance.post("/driver-order/handover/" + id);
      if (response.status == 201) {
        let data = response.data.data;
        success_notify("Buyurtma bajarildi!");
        socket.emit("buyurtma_bajarildi", response.data.data[0] );
        navigate("/orders");
        audio.play();
      }
    } catch (error) {
      error_notify(error.response.data.error);
      errorHandler(error, changeNotFound);
    }
  };

  const handleHandWait = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/driver-order/handwait/" + id);
      if (response.status == 201) {
        success_notify("Manzilga yetib keldingiz!");
        socket.emit("manzilga_yetib_keldim", {msg: "go"})
        setLoading(false);
        fetchData()
      }
    } catch (error) {
      error_notify(error.response.data.error);
      setLoading(false);
      errorHandler(error, changeNotFound);
    }
  };

  const handleHandRestart = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/driver-order/handrestart/" + id);
      if (response.status == 201) {
        success_notify("Oq Yo'l. Yo'lingiz ochiq bo'lsin. ");
        socket.emit("yulovchi_bilan_yulga_chiqdik", {msg: "go"})
        setLoading(false);
        fetchData()
      }
    } catch (error) {
      error_notify(error.response.data.error);
      setLoading(false);
      errorHandler(error, changeNotFound);
    }
  };


  if (notfound) {
    return <NotFound />;
  }

  const formatDate = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = addLeadingZero(date.getMonth() + 1);
    const day = addLeadingZero(date.getDate());
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());
    const seconds = addLeadingZero(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const addLeadingZero = (number) => {
    return number < 10 ? "0" + number : number;
  };

  return (
    <div className="DriverOrder">
      <Header title={"Buyurtma"} />
      {loading ? (
        <Loader />
      ) : (
        (data.length = 0 ? (
          <Loader />
        ) : (
          <div className="DriverOrder__container">
            <div className="DriverOrder__status">
              <p>{lotinKirilOtkazish("Bajarilmoqda")}</p>
            </div>
            <div className="DriverOrder__card">
              <h4>{formatDate(data.time)}</h4>
              <h3>
                {lotinKirilOtkazish("Buyurtma Raqami")}:{" "}
                <span>#{data.order_id}</span>
              </h3>
              <h1>
                {lotinKirilOtkazish(data.order_address || "Noma'lum Hudud")}
              </h1>
              <h2>{lotinKirilOtkazish(data.order_district)}</h2>
            </div>
            <div className="DriverOrder__card">
              <div className="DriverOrderOperator">
                <i className="fa-solid fa-user-gear icon"></i>
                <p>
                  {lotinKirilOtkazish(data.order_admin_first_name)}
                  {"  "}
                  {lotinKirilOtkazish(data.order_admin_last_name)}
                </p>
              </div>
            </div>
            <a
              href={"tel:" + data.order_phone_number}
              className="DriverOrder__phone"
            >
              <i className="fa-solid fa-phone-volume icon"></i>
              {lotinKirilOtkazish("Telefon Qilish")}
            </a>

            <button
              onClick={() => handleHandWait(data.id)}
              className={`DriverOrder__finish ${data.order_status == "progress" ? "finishedActive": null }`}
              disabled={data.order_status == "progress" ? false : true}
            >
              <i className="fa-solid fa-location-dot icon"></i>{" "}
              {lotinKirilOtkazish(`Manzilga Yetib Keldim`)}
            </button>

            <button
              onClick={() => handleHandRestart(data.id)}
              className={`DriverOrder__finish ${data.order_status == "wait" ? "finishedActive": null }`}
              disabled={data.order_status == "wait" ? false : true}
            >
              <i className="fa-solid fa-route icon"></i>{" "}
              {lotinKirilOtkazish(`Yo'lga Chiqish`)}
            </button>

            <button
              onClick={() => handleHandOver(data.id)}
              className={`DriverOrder__finish ${data.order_status == "restart" ? "finishedActive": null }`}
              disabled={data.order_status == "restart" ? false : true}
            >
              <i className="fa-solid fa-flag-checkered icon"></i>{" "}
              {lotinKirilOtkazish(`Buyurtmani
            tugatish`)}
            </button>

          </div>
        ))
      )}
      {/* <Sitebar /> */}
    </div>
  );
};
