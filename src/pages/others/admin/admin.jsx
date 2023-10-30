import { Link, useLocation, useParams } from "react-router-dom";
import "../../../assets/dashboard.css";
import { DashboardHeader } from "../../../components/dashboard-header/dashboard-header";
import { DashboardSidebar } from "../../../layouts";
import "./admin.css";
import { Fragment, useEffect, useState } from "react";
import {
  axiosAdmin,
  errorHandler,
  error_notify,
  success_notify,
} from "../../../shared";
import { Loader } from "../../../components";
import { formatmoney } from "../../../utils";
import { DailyPayment, Drivers_chart } from "../../../charts";
export const Admins = () => {
  const [data, setData] = useState([]);
  // const [dailyPaymet, setDailyPaymet] = useState([]);
  const [loading, setLoading] = useState(true);

  const { pathname } = useLocation();

  useEffect(() => {
    setLoading(true);
    fetchData();
    // fetchDataForCharts();
  }, [pathname]);

  const fetchData = async () => {
    try {
      const res = await axiosAdmin.get(
        pathname == "/dashboard/others/admins" ? "/admin" : "/admin/blocked"
      );
      if (res.status == 200) {
        setData(res.data.data.sort((a, b) => b.id - a.id));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  };

  // const fetchDataForCharts = async () => {
  //   try {
  //     const res = await axiosAdmin.get("/statistic/daily-payments");
  //     if (res.status == 200) {
  //       let datas = [];
  //       res.data.data.forEach(async (item) => {
  //         datas.push({
  //           kun: item.day,
  //           "O'tkazmalar soni": item.length,
  //           // "Pul miqdori": await formatmoney(item.money),
  //           "Pul miqdori": item.money,
  //         });
  //       });

  //       setDailyPaymet(datas);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     errorHandler(error);
  //   }
  // };

  const handleRemoveAdmin = async (id) => {
    try {
      const response = await axiosAdmin.delete("/admin/" + id);
      if (response.status == 200) {
        success_notify("Admin bloklandi!");
        fetchData();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleUnRemove = async (id) => {
    try {
      const response = await axiosAdmin.delete("/admin/un/" + id);
      if (response.status == 200) {
        success_notify("Admin tiklandi!");
        fetchData();
      }
    } catch (error) {
      error_notify(error.message);
      errorHandler(error);
    }
  };

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
    <div className="DashboardConfig">
      <DashboardSidebar />
      <div className="DashboardAdmins">
        <DashboardHeader title={"Admins Settings Panel"} />

        <div className="DashboardHeadOption">
          {pathname == "/dashboard/others/admins" ? (
            <Fragment>
              <Link
                to="/dashboard/others/admins/blocked"
                className="DashboardHeadOption__button"
              >
                <i class="fa-solid fa-ban icon"></i>
                Blocked
              </Link>
              <Link
                to="/dashboard/others/admins/add"
                className="DashboardHeadOption__button"
              >
                <i class="fa-solid fa-user-plus icon"></i>
                Add Admin
              </Link>
              <Link
                to="/dashboard/others"
                className="DashboardHeadOption__button"
              >
                <i className="fa-solid fa-chevron-left icon"></i>
                Back to " Others Panel "
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link
                to="/dashboard/others/admins"
                className="DashboardHeadOption__button"
              >
                <i className="fa-solid fa-chevron-left icon"></i>
                Back to " Admins Panel "
              </Link>
            </Fragment>
          )}
        </div>

        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            {/* <DailyPayment base={dailyPaymet} /> */}
            <section className="DashboardAdmins__section">
              <table className="AdminsSection__table">
                <tr>
                  <th>ID</th>
                  <th>ISM</th>
                  <th>FAMILYA</th>
                  <th>TELEFON</th>
                  <th>USERNAME</th>
                  <th>ROLE</th>
                  <th>YOSH</th>
                  <th>ACTIVE</th>
                  <th>SANA</th>
                  <th>OPTIONS</th>
                </tr>
                {data.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.id}</td>
                    <td>{admin.first_name}</td>
                    <td>{admin.last_name}</td>
                    <td>{admin.phone_number}</td>
                    <td>{admin.username}</td>
                    <td>{admin.role}</td>
                    <td>{admin.age}</td>
                    <td>{admin.active ? "ISHDA" : "ISHDA EMAS"}</td>
                    <td>{formatDate(admin.created_at)}</td>
                    <td>
                      <div className="AdminsSectionTable__options">
                        {pathname == "/dashboard/others/admins" ? (
                          <>
                            <Link
                              to={`/dashboard/others/admins/edit/${admin.id}`}
                            >
                              <i className="fa-solid fa-pen-to-square icon"></i>
                            </Link>
                            <i
                              className="fa-solid fa-ban icon"
                              onClick={() => handleRemoveAdmin(admin.id)}
                            ></i>
                          </>
                        ) : (
                          <>
                            <i
                              className="fa-solid fa-unlock icon"
                              onClick={() => handleUnRemove(admin.id)}
                            ></i>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
            </section>
          </Fragment>
        )}
      </div>
    </div>
  );
};
