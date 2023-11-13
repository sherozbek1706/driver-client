import bcryptjs from "bcryptjs";
import { Fragment, useEffect, useRef, useState } from "react";
import { socket } from "../../App";
import ringtong_new_order from "../../assets/music/ringtong_order.wav";
import {
  Empty,
  HaveOrder,
  Header,
  Loader,
  NoActive,
  Payment,
} from "../../components";
import { Sitebar } from "../../layouts";
import { axiosInstance } from "../../shared";
import { errorHandler } from "../../shared/handler/errors";
import { error_notify, success_notify } from "../../shared/notify";
import { lotinKirilOtkazish } from "../../utils/functions/lotin-kiril";
import "./order.css";

export const Order = () => {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(true);
  const [payment, setPayment] = useState(false);
  const [haveOrder, setHaveOrder] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState("");
  const [orderId, setOrderId] = useState("");

  const timeModal = useRef(null)

  useEffect(() => {
    const audio = new Audio(ringtong_new_order);
    if (!haveOrder) {
      setLoading(true);
      fetchData();
    } else {
      setLoading(true);
      getParams();
    }

    if (active) {
      if (!haveOrder) {
        socket.on("yangi_buyurtmani_olish", (data) => {
          audio.play();
          setLoading(true);
          fetchData();
        });
      }
    }

    socket.on("buyurtma_qabul_qilindi", (data) => {
      fetchData();
    });

    socket.on("buyurtma_tuliq_bajarildi", (data) => {
      fetchData();
    });
  }, [socket, haveOrder]);

  const changeActive = () => {
    setActive(false);
  };

  const changePayment = () => {
    setPayment(true);
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/order/open");
      setData(response.data.data);
      if (response.status == 200) {
        setLoading(false);
      }
    } catch (error) {
      if (
        error.response.status == 403 &&
        error.response.data.error == "Hozirda sizda tugallanmagan zakaz mavjud."
      ) {
        setHaveOrder(true);
        setLoading(false);
      } else if (
        error.response.status == 402 &&
        error.response.data.error == "Mablag' yetarli emas!"
      ) {
        changePayment();
        setLoading(false);
      } else {
        errorHandler(error, changeActive);
        setLoading(false);
      }
    }
  };

  const getParams = async () => {
    try {
      const response = await axiosInstance.get("/driver-order");
      if (response.status == 200) {
        setLoading(false);
        let param = await bcryptjs.hash(response.data.data.id.toString(), 10);
        while (param.includes("/")) {
          param = await bcryptjs.hash(response.data.data.id.toString(), 10);
        }
        setParams(
          param + "sHeRoZbek" + response.data.data.id.toString() + param
        );
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  };

  const handleSelectOrder = (id = 0) => {
    setOrderId(id);
    timeModal.current.classList.toggle("show_modal")
  }

  const handleGetOrder = async (id, time) => {
    try {
      const response = await axiosInstance.post("/driver-order/" + id, { time });
      if (response.status == 201) {
        success_notify("Siz buyurtmani qabul qildingiz");
        socket.emit("buyurtmani_qabul_qilish", { msg: "go" });
        fetchData();
      }
    } catch (error) {
      error_notify(error.response.data.error);
      errorHandler(error);
    } finally {
      timeModal.current.classList.toggle("show_modal")
    }
  };

  return (
    <Fragment>
      <div className="OrderTimerModal" ref={timeModal}>
        <div className="OrderTimerModal__cloud">
          <h1 className="OrderTimerModalCloud__title">
            Buyurtmaga Necha Daqiqada yetib borishingizni tanlang!
          </h1>
          <button className="OrderTimerModalTime" onClick={() => handleGetOrder(orderId, 5)} >
            <span>5</span> daqiqada yetib boraman!
          </button>
          <button className="OrderTimerModalTime" onClick={() => handleGetOrder(orderId, 8)} >
            <span>8</span> daqiqada yetib boraman!
          </button>
          <button className="OrderTimerModalTime" onClick={() => handleGetOrder(orderId, 10)} >
            <span>10</span> daqiqada yetib boraman!
          </button>
          <button className="OrderTimerModalTime" onClick={() => handleGetOrder(orderId, 15)} >
            <span>15</span> daqiqada yetib boraman!
          </button>
          <button className="OrderTimerModalTime" onClick={() => handleGetOrder(orderId, 30)} >
            <span>30</span> daqiqada yetib boraman!
          </button>
        </div>
        <button className="OrderTimerModal__cancel" onClick={handleSelectOrder}>
          <i className="fa-solid fa-circle-xmark icon"></i>
          Buyurtmani Ortga qaytarish
        </button>
      </div>
      <div className="Order">
        <Header title={"Buyurtmalar"} />
        <div className="Orders__container">
          {loading ? (
            <Loader />
          ) : haveOrder ? (
            <HaveOrder id={params} />
          ) : !active ? (
            <NoActive />
          ) : payment ? (
            <Payment />
          ) : data.length == 0 ? (
            <Empty />
          ) : (
            <div className="OrdersContainer__list">
              {data.map((item) => (
                <Fragment key={item.id}>
                  <div className="OrdersContainer__item">
                    <div className="OrdersContainerItem__address">
                      <h1>{lotinKirilOtkazish(item.address || "Nomalum")}</h1>
                      <h2>{lotinKirilOtkazish(item.district)}</h2>
                    </div>
                    <button
                      className="OrdersContainerItem__get"
                      onClick={() => handleSelectOrder(item.id)}
                    >
                      {lotinKirilOtkazish("QABUL QILISH")}
                    </button>
                  </div>
                </Fragment>
              ))}
              <h1 className="Orders__count">
                - {data.length} {lotinKirilOtkazish("ta buyutma topildi")} -
              </h1>
            </div>
          )}
        </div>
        <Sitebar />
      </div>
    </Fragment>
  );
};
