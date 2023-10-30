import { Fragment, useEffect, useState } from "react";
import { DashboardHeader } from "../../components/dashboard-header/dashboard-header";
import { DashboardSidebar } from "../../layouts";
import "./dashboard-model.css";
import "../../assets/dashboard.css";
import {
  axiosAdmin,
  errorHandler,
  error_notify,
  success_notify,
} from "../../shared";
import { Loader } from "../../components";
import { Link } from "react-router-dom";
export const DashboardModel = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {
        data: { data: carmodel },
      } = await axiosAdmin.get("/car-model");

      setData(carmodel);
      setLoading(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleRemoveModel = async (id) => {
    try {
      const response = await axiosAdmin.delete("/car-model/" + id);
      if (response.status == 200) {
        success_notify("Model o'chirildi!");
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
      <div className="DashboardCategory">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <DashboardHeader title={"Car Model Setting Panel"} />

            <div className="DashboardHeadOption">
              <Link
                to="/dashboard/model/add"
                className="DashboardHeadOption__button"
              >
                <i className="fa-solid fa-plus icon"></i>
                Create Model
              </Link>
            </div>

            <div className="DashboardCategory__list">
              <div className="DashboardCategory__row_head">
                <p className="DashboardCategoryRow__id">
                  <b>ID</b>
                </p>
                <p className="DashboardCategoryRow__model">
                  <b>MODEL</b>
                </p>
              </div>
            </div>
            <div className="DashboardCategory__list">
              {data.map((item) => (
                <div className="DashboardCategory__row" key={item.id}>
                  <p className="DashboardCategoryRow__id">{item.id}</p>
                  <p className="DashboardCategoryRow__model">{item.model}</p>
                  <div className="DashboardCategoryRow__option">
                    <Link to={"/dashboard/model/edit/" + item.id}>
                      <i className="fa-solid fa-pen-to-square icon"></i>
                    </Link>
                    <i
                      className="fa-solid fa-trash icon"
                      onClick={() => handleRemoveModel(item.id)}
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
