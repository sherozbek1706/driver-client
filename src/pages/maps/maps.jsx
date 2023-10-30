import { Fragment, useEffect, useRef, useState } from "react";
import { Header, Loader, NoActive } from "../../components";
import { Sitebar } from "../../layouts";
import "./maps.css";
import { axiosInstance } from "../../shared/services";
import { errorHandler } from "../../shared/handler/errors";
import { lotinKirilOtkazish } from "../../utils/functions/lotin-kiril";

export const Maps = () => {
  const modal = useRef();
  const content = useRef();

  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const changeActive = () => {
    setActive(false);
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/address");
      const base = response.data.data;
      setData(base);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorHandler(error, changeActive);
    }
  };

  const toggleModal = () => {
    let modalEl = modal.current;
    modalEl.classList.toggle("Maps_modal_sticky");
  };

  const onClickShowModal = (id) => {
    const info = data.find((u) => u.id == id);

    const contentEl = content.current;

    if (info) {
      contentEl.textContent =
        lotinKirilOtkazish(`Sababi, "${info.address}" hozirgacha bizning dasturdan turib - "${info.order_count}"
      marotaba buyurtma qilingan.`);
      toggleModal();
    }
  };

  return (
    <div className="Maps">
      <div className="Maps__modal" ref={modal}>
        <div className="MapsModal__cloud">
          <div className="MapsModal__box">
            <h1 className="MapsModalBox__title">
              {lotinKirilOtkazish("Nega bu Manzil ?")}
            </h1>
            <p className="MapsModalBox__content" ref={content}></p>
            <button className="MapsModalBox__closebtn" onClick={toggleModal}>
              <i className="fa-solid fa-xmark icon"></i>{" "}
              {lotinKirilOtkazish("YOPISH")}
            </button>
          </div>
        </div>
      </div>
      <Header title={"Manzillar"} />
      <div className="Maps__container">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            {!active ? (
              <NoActive />
            ) : (
              <>
                {data.map((item) => (
                  <div className="Maps__box" key={item.id}>
                    <h3 className="Maps__address">
                      {lotinKirilOtkazish(item.address)}
                    </h3>
                    <div
                      className="Maps__details"
                      onClick={() => onClickShowModal(item.id)}
                    >
                      <i className="fa-solid fa-ellipsis icon"></i>
                    </div>
                  </div>
                ))}
                <h1 className="Maps__count">
                  - {data.length} {lotinKirilOtkazish("ta manzil topildi")} -
                </h1>
              </>
            )}
          </Fragment>
        )}
      </div>
      <Sitebar />
    </div>
  );
};
