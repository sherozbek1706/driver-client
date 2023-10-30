import { useEffect, useState } from "react";
import { Loader } from "../../components";
import { axiosAdmin, errorHandler, error_notify } from "../../shared";
import { api } from "../../utils";
import "./driver-modal.css";
export const DriverModal = ({ user: driverId, changeOpen }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchOrders();
    handleChangeVisibilty("open");
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosAdmin("/driver/" + driverId);
      if (response.status == 200) {
        setData(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      error_notify(error.message);
      errorHandler(error);
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await axiosAdmin("/driver-order/driver/" + driverId);
      if (response.status == 200) {
        setOrder(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      error_notify(error.message);
      errorHandler(error);
    }
  };

  const handleChangeVisibilty = (way) => {
    const modal = document.querySelector(".DriverModal");
    if (way == "open") {
      modal.classList.add("show_modal");
    } else if (way == "close") {
      modal.classList.remove("show_modal");
      changeOpen();
    }
  };

  return (
    <div className="DriverModal">
      <div className="DriverModal__cloud">
        <div className="DriverModalHeader">
          <h1 className="DriverModalHeader__title">Driver Profile Info</h1>
          <div className="DriverModalHeader__options">
            <button
              className="DriverModalHeaderOptions__btn"
              onClick={() => handleChangeVisibilty("close")}
            >
              Close Modal
            </button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="DriverModalInfo">
            <div className="DriverModalInfo__left">
              <div className="DriverModalInfoImg">
                <img
                  src={`${api}${data.image}`}
                  className="DriverModalInfoImg__link"
                  alt=""
                />
              </div>
            </div>
            <div className="DriverModalInfo__right">
              <div className="DriverModalInfo__card">
                <p>
                  ID: <span>{data.id}</span>
                </p>
                <p>
                  BALANS: <span>{data.balans}</span>
                </p>
                <p>
                  FIRST NAME: <span>{data.first_name}</span>
                </p>
                <p>
                  LAST NAME: <span>{data.last_name} </span>
                </p>
                <p>
                  CREATED AT:
                  <span>{new Date(data.created_at).toDateString()} </span>
                </p>
                <p>
                  PHONE NUMBER: <span>{data.phone_number} </span>
                </p>
                <p>
                  AGE: <span>{data.age} </span>
                </p>
                <p>
                  CAR MODEL: <span>{data.car_model} </span>
                </p>
                <p>
                  CAR NUMBER: <span>{data.car_number} </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
