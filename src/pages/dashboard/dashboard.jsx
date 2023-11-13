import React, { useEffect, useState } from "react";
import {
  DailyPaid,
  Daily_order_charts,
  Drivers_chart,
  New_Driver_charts,
} from "../../charts";
// import { saveAs } from "file-saver";
import { DashboardHeader, Loader } from "../../components";
import { DashboardSidebar } from "../../layouts";
import { axiosAdmin, errorHandler } from "../../shared/";
// import axios from "axios";
import "./dashboard.css";

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    car_model: [],
    car_region: [],
    car: [],
    driver: [],
    address: [],
    order: [],
  });
  const [driverChart, setDriverChart] = useState([]);
  const [dailyOrderChart, setDailyOrderChart] = useState([]);
  const [newdriverChart, setNewDriverChart] = useState([]);
  const [dailypaidChart, setDailypaidChart] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchCharts();
  }, []);

  const fetchCharts = async () => {
    try {
      const response1 = await axiosAdmin("/statistic/top-driver");
      const response2 = await axiosAdmin("/statistic/daily-order");
      const response3 = await axiosAdmin("/statistic/new-drivers");
      const response4 = await axiosAdmin("/statistic/daily-paid");
      if (response1.status == 200) {
        let datas = [];
        response1.data.data.forEach((item) => {
          datas.push({
            name: item.username,
            orders: item.order.length,
          });
        });
        setDriverChart(datas);
      }
      if (response2.status == 200) {
        let datas = [];
        response2.data.data.data.forEach((item) => {
          datas.push({
            time: item.time,
            length: item.length,
          });
        });
        setDailyOrderChart(datas);
      }
      if (response3.status == 200) {
        let datas = [];
        response3.data.data.forEach((item) => {
          datas.push({
            day: item.day,
            length: item.length,
          });
        });
        setNewDriverChart(datas);
      }
      if (response4.status == 200) {
        let datas = [];
        response4.data.data.info.forEach((item) => {
          datas.push({
            day: item.day,
            orders: item.count_created,
            todays_paid: item.not_paid_that_day,
            others_paid: item.count_paid,
          });
        });
        setDailypaidChart(datas);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  };

  const fetchData = async () => {
    try {
      const carModelResponse = await axiosAdmin.get("/car-model");
      const carRegionResponse = await axiosAdmin.get("/car-region");
      const carResponse = await axiosAdmin.get("/car");
      const driverResponse = await axiosAdmin.get("/driver");
      const addressResponse = await axiosAdmin.get("/address");
      const orderResponse = await axiosAdmin.get("/order");

      setData({
        car_model: carModelResponse.data.data,
        car_region: carRegionResponse.data.data,
        car: carResponse.data.data,
        driver: driverResponse.data.data,
        address: addressResponse.data.data,
        order: orderResponse.data.data,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  };

  // const createAndDownload = async () => {
  //   try {
  //     await axiosAdmin
  //       .post("/create-pdf", dailypaidChart)
  //       .then(
  //         async () =>
  //           await axios.get("http://localhost:5000/fetch-pdf", {
  //             responseType: "blob",
  //           })
  //       )
  //       .then((res) => {
  //         const pdfBlob = new Blob([res.data], { type: "application/pdf" });

  //         saveAs(pdfBlob, "newPdf.pdf");
  //       });
  //   } catch (error) {
  //   }
  // };

  return (
    <div className="DashboardConfig">
      <DashboardSidebar />
      {loading ? (
        <Loader />
      ) : (
        <div className="Dashboard">
          <DashboardHeader title={"Admin Dashboard Panel"} />
          <DailyPaid base={dailypaidChart} />
          {/* <button onClick={createAndDownload}>Download PDF</button> */}
          <New_Driver_charts base={newdriverChart} />
          <Drivers_chart base={driverChart} />
          <Daily_order_charts base={dailyOrderChart} />
          <div className="Dashboard__list">
            <div className="Dashboard__boxes">
              <h3>{data.driver.length}</h3>
              <h1>Haydovchi</h1>
            </div>
            <div className="Dashboard__boxes">
              <h3>{data.address.length}</h3>
              <h1>Manzillar</h1>
            </div>
            <div className="Dashboard__boxes">
              <h3>{data.car_model.length}</h3>
              <h1>Mashina modellari</h1>
            </div>
            <div className="Dashboard__boxes">
              <h3>{data.car_region.length}</h3>
              <h1>Mashina Viloyati</h1>
            </div>
            <div className="Dashboard__boxes">
              <h3>{data.car.length}</h3>
              <h1>Moshinalar soni</h1>
            </div>
            <div className="Dashboard__boxes">
              <h3>{data.order.length}</h3>
              <h1>Umumiy Buyurtmalar</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
