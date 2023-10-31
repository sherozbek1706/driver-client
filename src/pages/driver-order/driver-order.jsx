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
        success_notify("Buyurtma bajarildi!");
        socket.emit("handover_order_driver", { msg: "go" });
        navigate("/orders");
        audio.play();
      }
    } catch (error) {
      error_notify(error.response.data.error);
      errorHandler(error, changeNotFound);
    }
  };

  if (notfound) {
    return <NotFound />;
  }
  // if (loading) {
  //   return <Loader />;
  // }

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
            {console.log(data)}
            <div className="DriverOrder__status">
              <p>{lotinKirilOtkazish("Bajarilmoqda")}</p>
            </div>
            <div className="DriverOrder__card">
              <h4>{new Date(data.time).toLocaleString()}</h4>
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
              onClick={() => handleHandOver(data.id)}
              className="DriverOrder__finish"
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
