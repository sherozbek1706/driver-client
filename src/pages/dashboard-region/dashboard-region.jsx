import { Fragment, useEffect, useState } from "react";
import { DashboardHeader } from "../../components/dashboard-header/dashboard-header";
import { DashboardSidebar } from "../../layouts";
import "./dashboard-region.css";
import {
  axiosAdmin,
  errorHandler,
  error_notify,
  success_notify,
} from "../../shared";
import { Loader } from "../../components";
import { Link } from "react-router-dom";
export const DashboardRegion = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {
        data: { data: carregion },
      } = await axiosAdmin.get("/car-region");

      setData(carregion);
      setLoading(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleRemoveRegion = async (id) => {
    try {
      const response = await axiosAdmin.delete("/car-region/" + id);
      if (response.status == 200) {
        success_notify("Region o'chirildi!");
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
      <div className="DashboardRegion">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <DashboardHeader title={"Car Region Setting Panel"} />

            <div className="DashboardHeadOption">
              <Link
                to="/dashboard/region/add"
                className="DashboardHeadOption__button"
              >
                <i className="fa-solid fa-plus icon"></i>
                Create Region
              </Link>
            </div>

            <div className="DashboardRegion__list">
              <div className="DashboardRegion__row_head">
                <p className="DashboardRegionRow__id">
                  <b>ID</b>
                </p>
                <p className="DashboardRegionRow__region">
                  <b>REGION</b>
                </p>
                <p className="DashboardRegionRow__number">
                  <b>NUMBER</b>
                </p>
              </div>
            </div>
            <div className="DashboardRegion__list">
              {data.map((item) => (
                <div className="DashboardRegion__row" key={item.id}>
                  <p className="DashboardRegionRow__id">{item.id}</p>
                  <p className="DashboardRegionRow__region">
                    {item.region || "UNKW"}
                  </p>
                  <p className="DashboardRegionRow__number">
                    {item.number || "UNKW"}
                  </p>
                  <div className="DashboardRegionRow__option">
                    <Link to={"/dashboard/region/edit/" + item.id}>
                      <i className="fa-solid fa-pen-to-square icon"></i>
                    </Link>
                    <i
                      className="fa-solid fa-trash icon"
                      onClick={() => handleRemoveRegion(item.id)}
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
