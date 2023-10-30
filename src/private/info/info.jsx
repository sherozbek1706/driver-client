import { Fragment, useEffect, useState } from "react";
import "./info.css";
import { axiosAdmin } from "../../shared";
export const Info = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosAdmin("/statistic/daily-paid");

      if (response.status == 200) {
        let data = response.data.data;
        console.log(data);
        setData(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
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

  if (loading) {
    return <p style={{ color: "white" }}>Loading...</p>;
  }

  return (
    <div className="Info">
      <div className="Info__header">
        <div className="InfoHeader__cloud">
          <h2 className="InfoHeader__title">
            barcha buyurtmalar bo'yicha malumotlar!
          </h2>
        </div>
      </div>
      <section className="Info__section">
        <h2 className="InfoSection__title">Yangi Qo'shilgan Buyurtmalar</h2>
        {data.created_data.reverse().map((item, idx) => (
          <Fragment key={idx}>
            <h3 className="InfoSection__date">{item.day}</h3>
            <table className="InfoSection__table">
              <tr>
                <th>Id</th>
                <th>Buyurtma</th>
                <th>Haydovchi</th>
                <th>Bajarilgan Vaqt</th>
                <th>To'langan Vaqt</th>
                <th>To'lganmi ?</th>
              </tr>
              {item.data.reverse().map((info, idx) => (
                <tr key={idx}>
                  <td>{info.id}</td>
                  <td>
                    {info.order_id || "-"} | {info.address || "-"} |{" "}
                    {info.district || "-"}
                  </td>
                  <td>
                    {info.driver_id || "-"} | {info.first_name || "-"} |{" "}
                    {info.username || "-"} | {info.phone_number || "-"}
                  </td>
                  <td>{formatDate(info.time)}</td>
                  <td>{info.paid_time ? formatDate(info.paid_time) : "-"}</td>
                  <td>{info.paid ? "To'langan!" : "-"}</td>
                </tr>
              ))}
            </table>
          </Fragment>
        ))}
        {/* <h3 className="InfoSection__date">2023-10-23</h3>
        <table className="InfoSection__table">
          <tr>
            <th>Id</th>
            <th>Buyurtma Id</th>
            <th>Haydovchi Id</th>
            <th>Bajarilgan Vaqt</th>
            <th>To'langan Vaqt</th>
            <th>To'lganmi ?</th>
          </tr>
          <tr>
            <td>2</td>
            <td>4</td>
            <td>22</td>
            <td>2023-05-23 23:00</td>
            <td>2023-07-24 24:00</td>
            <td>Ha</td>
          </tr>
        </table> */}
      </section>
    </div>
  );
};
