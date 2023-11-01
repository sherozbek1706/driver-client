import { Fragment, useEffect, useState } from "react";
import { Header, Loader, NoActive } from "../../components";
import { Sitebar } from "../../layouts";
import CountUp from "react-countup";
import "./home.css";
import Cookies from "js-cookie";
import { axiosInstance, errorHandler } from "../../shared";
import { DailyWork, Daily_order_charts } from "../../charts";
import { lotinKirilOtkazish } from "../../utils/functions/lotin-kiril";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMap, setLoadingMap] = useState(true);
  const [active, setActive] = useState(true);
  const [data, setData] = useState([]);
  const [dailyWork, setDailyWork] = useState([]);
  const [mappingData, setMappingData] = useState([]);
  const [option, setOption] = useState("all");

  useEffect(() => {
    setLoadingMap(true);
    fetchData();
  }, [option]);

  const changeActive = () => {
    setActive(false);
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/driver/info");
      const response1 = await axiosInstance.get("/statistic/daily-work");
      if (response.status == 200) {
        if (option == "all") {
          setMappingData(response.data.data.all.data.reverse());
          setLoadingMap(false);
        } else if (option == "paid") {
          setLoadingMap(false);
          setMappingData(response.data.data.paid.data.reverse());
        } else if (option == "not_paid") {
          setLoadingMap(false);
          setMappingData(response.data.data.not_paid.data.reverse());
        } else if (option == "tdy") {
          setLoadingMap(false);
          setMappingData(response.data.data.tdy.data.reverse());
        } else if (option == "ld7") {
          setLoadingMap(false);
          setMappingData(response.data.data.ld7.data.reverse());
        }
        setData(response.data.data);
        setLoading(false);
      }
      if (response1.status == 200) {
        let datas = [];
        response1.data.data.data.forEach((item) => {
          datas.push({
            time: item.time,
            miqdor: item.length,
          });
        });
        setDailyWork(datas);
      }
    } catch (error) {
      setLoading(false);
      errorHandler(error, changeActive);
    }
  };

  return (
    <div className="Home">
      <Header title={"Bosh Sahifa"} />
      {!active ? (
        <NoActive />
      ) : loading ? (
        <Loader />
      ) : (
        <Fragment>
          <DailyWork base={dailyWork} />
          <div className="Home__container">
            <div className="Home__header">
              <button
                onClick={() => setOption("all")}
                className={`HomeHeader__btn HomeHeader__btn__all ${
                  option == "all" ? "active" : ""
                }`}
              >
                <p>
                  <CountUp end={data.all.length} duration={4} />
                </p>{" "}
                {lotinKirilOtkazish("Barcha Buyurtmalar")}
              </button>
              <button
                onClick={() => setOption("not_paid")}
                className={`HomeHeader__btn ${
                  option == "not_paid" ? "active" : ""
                }`}
              >
                <p>
                  <CountUp end={data.not_paid.length} duration={4} />
                </p>{" "}
                {lotinKirilOtkazish("To'lanmagan")}
              </button>
              <button
                onClick={() => setOption("paid")}
                className={`HomeHeader__btn ${
                  option == "paid" ? "active" : ""
                }`}
              >
                <p>
                  <CountUp end={data.paid.length} duration={4} />
                </p>{" "}
                {lotinKirilOtkazish("To'langan")}
              </button>
              <button
                onClick={() => setOption("tdy")}
                className={`HomeHeader__btn ${option == "tdy" ? "active" : ""}`}
              >
                <p>
                  <CountUp end={data.tdy.length} duration={4} />
                </p>{" "}
                {lotinKirilOtkazish("Kunlik")}
              </button>
              <button
                onClick={() => setOption("ld7")}
                className={`HomeHeader__btn ${option == "ld7" ? "active" : ""}`}
              >
                <p>
                  <CountUp end={data.ld7.length} duration={4} />
                </p>{" "}
                {lotinKirilOtkazish("Haftalik")}
              </button>
            </div>
            <div className="Home__orders">
              <h1 className="HomeOrders__title">
                {option == "all"
                  ? lotinKirilOtkazish("Barcha Buyurtmalar")
                  : option == "paid"
                  ? lotinKirilOtkazish("To'langan Buyurtmalar")
                  : option == "not_paid"
                  ? lotinKirilOtkazish("To'lanmagan Buyurtmlar")
                  : option == "tdy"
                  ? lotinKirilOtkazish("Kunlik Buyurtmalar")
                  : option == "ld7"
                  ? lotinKirilOtkazish("Haftalik Buyurtmalar")
                  : ""}
              </h1>
              {loadingMap ? (
                <Loader still={"please"} />
              ) : mappingData.length == 0 ? (
                <h1 className="HomeOrders__warn">
                  {lotinKirilOtkazish("Buyurtmalar topilmadi!")}
                </h1>
              ) : (
                mappingData.map((item) => (
                  <div className="HomeOrdersList" key={item?.id}>
                    <div className="HomeOrdersList__left">
                      <p className="HomeOrdersList__id">#{item?.id}</p>
                      <p className="HomeOrdersList__address">
                        {lotinKirilOtkazish(item?.address || "Nomalum")}
                      </p>
                    </div>
                    <div className="HomeOrdersList__right">
                      <p
                        className={`HomeOrdersList__btn ${
                          item.paid ? "paid" : "not_paid"
                        }`}
                      >
                        {item.paid
                          ? lotinKirilOtkazish("To'langan")
                          : lotinKirilOtkazish("To'lanmagan")}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Fragment>
      )}
      <Sitebar />
    </div>
  );
};
