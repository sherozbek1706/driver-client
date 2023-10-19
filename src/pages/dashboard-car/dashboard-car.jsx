import { Fragment, useEffect, useState } from "react";
import { DashboardHeader } from "../../components/dashboard-header/dashboard-header";
import { DashboardSidebar } from "../../layouts";
import "./dashboard-car.css";
import {
  axiosAdmin,
  errorHandler,
  error_notify,
  success_notify,
} from "../../shared";
import { Loader } from "../../components";
import { Link } from "react-router-dom";
export const DashboardCars = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {
        data: { data: car },
      } = await axiosAdmin.get("/car");

      setData(car);
      setLoading(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleRemoveCar = async (id) => {
    try {
      const response = await axiosAdmin.delete("/car/" + id);
      if (response.status == 200) {
        success_notify("Car o'chirildi!");
        fetchData();
      }
    } catch (error) {
      error_notify(error.message);
      errorHandler(error);
    }
  };

  return (
    <div className="DashboardConfig">
      <DashboardSidebar />
      <div className="DashboardCars">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <DashboardHeader title={"Cars Setting Panel"} />

            <div className="DashboardHeadOption">
              <Link
                to="/dashboard/car/add"
                className="DashboardHeadOption__button"
              >
                <i className="fa-solid fa-plus icon"></i>
                Create Car
              </Link>
            </div>

            <div className="DashboardCars__list">
              <div className="DashboardCars__row">
                <p className="DashboardCarsRow__id">
                  <b>ID</b>
                </p>
                <p className="DashboardCarsRow__car_model">
                  <b>MODEL</b>
                </p>
                <p className="DashboardCarsRow__car_region">
                  <b>REGION</b>
                </p>
                <p className="DashboardCarsRow__car_region_number">
                  <b>R.N</b>
                </p>
                <p className="DashboardCarsRow__number">
                  <b>NUMBER</b>
                </p>
                <p className="DashboardCarsRow__year">
                  <b>YEAR</b>
                </p>
                <p className="DashboardCarsRow__color">
                  <b>COLOR</b>
                </p>
              </div>
            </div>
            <div className="DashboardCars__list">
              {data.map((item) => (
                <div className="DashboardCars__row" key={item.id}>
                  <p className="DashboardCarsRow__id">{item.id}</p>
                  <p className="DashboardCarsRow__car_model">
                    {item.car_model || "UNKW"}
                  </p>
                  <p className="DashboardCarsRow__car_region">
                    {item.car_region || "UNKW"}
                  </p>
                  <p className="DashboardCarsRow__car_region_number">
                    {item.car_region_number || "UNKW"}
                  </p>
                  <p className="DashboardCarsRow__number">{item.number}</p>
                  <p className="DashboardCarsRow__year">{item.year}</p>
                  <p className="DashboardCarsRow__color">{item.color}</p>
                  <div className="DashboardCarsRow__option">
                    <Link to={"/dashboard/car/edit/" + item.id}>
                      <i className="fa-solid fa-pen-to-square icon"></i>
                    </Link>
                    <i
                      className="fa-solid fa-trash icon"
                      onClick={() => handleRemoveCar(item.id)}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};
