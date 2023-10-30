import { Link } from "react-router-dom";
import "../../../assets/dashboard.css";
import { DashboardHeader } from "../../../components/dashboard-header/dashboard-header";
import { DashboardSidebar } from "../../../layouts";
import "./payments.css";
import { Fragment, useEffect, useState } from "react";
import { axiosAdmin, errorHandler } from "../../../shared";
import { Loader } from "../../../components";
import { formatmoney } from "../../../utils";
import { DailyPayment, Drivers_chart } from "../../../charts";
export const Payments = () => {
  const [data, setData] = useState([]);
  const [dailyPaymet, setDailyPaymet] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchDataForCharts();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosAdmin.get("/payments");
      if (res.status == 200) {
        setData(res.data.data.sort((a, b) => b.id - a.id));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  };

  const fetchDataForCharts = async () => {
    try {
      const res = await axiosAdmin.get("/statistic/daily-payments");
      if (res.status == 200) {
        let datas = [];
        res.data.data.forEach(async (item) => {
          datas.push({
            kun: item.day,
            "O'tkazmalar soni": item.length,
            // "Pul miqdori": await formatmoney(item.money),
            "Pul miqdori": item.money,
          });
        });

        setDailyPaymet(datas);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
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
      <div className="DashboardPayments">
        <DashboardHeader title={"Payments Settings Panel"} />

        <div className="DashboardHeadOption">
          <Link to="/dashboard/others" className="DashboardHeadOption__button">
            <i className="fa-solid fa-chevron-left icon"></i>
            Back to " Others Panel "
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <DailyPayment base={dailyPaymet} />
            <section className="DashboardPayments__section">
              <table className="PaymentsSection__table">
                <tr>
                  <th>ID</th>
                  <th>SANA</th>
                  <th>TASHLANGAN PUL</th>
                  <th>BONUS</th>
                  <th>SUMMA</th>
                  <th>ESKI SUMMA</th>
                  <th>YANGI SUMMA</th>
                  <th>ADMIN</th>
                  <th>HAYDOVCHI</th>
                </tr>
                {data.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{formatDate(payment.payment_date)}</td>
                    <td>{formatmoney(payment.money)}</td>
                    <td>{payment.action}</td>
                    <td>{formatmoney(payment.then_money)}</td>
                    <td>{formatmoney(payment.old_balans)}</td>
                    <td>{formatmoney(payment.new_balans)}</td>
                    <td>
                      {payment.admin_firstname} {payment.admin_lastname} |{" "}
                      {payment.admin_username}
                    </td>
                    <td>
                      {payment.driver_firstname} | {payment.driver_username}
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
