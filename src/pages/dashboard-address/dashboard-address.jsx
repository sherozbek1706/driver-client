import { Fragment, useEffect, useState } from "react";
import { DashboardHeader } from "../../components/dashboard-header/dashboard-header";
import { DashboardSidebar } from "../../layouts";
import "./dashboard-address.css";
import {
  axiosAdmin,
  errorHandler,
  error_notify,
  success_notify,
} from "../../shared";
import { Loader } from "../../components";
import { Link } from "react-router-dom";
export const DashboardAddress = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {
        data: { data: caraddress },
      } = await axiosAdmin.get("/address");

      setData(caraddress);
      setLoading(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleRemoveAddress = async (id) => {
    try {
      const response = await axiosAdmin.delete("/address/" + id);
      if (response.status == 200) {
        fetchData();
        success_notify("Address o'chirildi!");
      }
    } catch (error) {
      error_notify(error.message);
      errorHandler(error);
    }
  };

  return (
    <div className="DashboardConfig">
      <DashboardSidebar />
      <div className="DashboardAddress">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <DashboardHeader title={"Address Setting Panel"} />

            <div className="DashboardHeadOption">
              <Link
                to="/dashboard/address/add"
                className="DashboardHeadOption__button"
              >
                <i className="fa-solid fa-plus icon"></i>
                Create Address
              </Link>
            </div>

            <div className="DashboardAddress__list">
              <div className="DashboardAddress__row_head">
                <p className="DashboardAddressRow__id">
                  <b>ID</b>
                </p>
                <p className="DashboardAddressRow__model">
                  <b>Address</b>
                </p>
              </div>
            </div>
            <div className="DashboardAddress__list">
              {data.map((item) => (
                <div className="DashboardAddress__row" key={item.id}>
                  <p className="DashboardAddressRow__id">{item.id}</p>
                  <p className="DashboardAddressRow__model">{item.address}</p>
                  <div className="DashboardAddressRow__option">
                    <Link to={"/dashboard/address/edit/" + item.id}>
                      <i className="fa-solid fa-pen-to-square icon"></i>
                    </Link>
                    <i
                      className="fa-solid fa-trash icon"
                      onClick={() => handleRemoveAddress(item.id)}
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
