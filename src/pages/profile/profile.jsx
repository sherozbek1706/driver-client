import { useEffect, useState } from "react";
import { ActiveDriver, Header, Loader } from "../../components";
import { Sitebar } from "../../layouts";
import { axiosInstance } from "../../shared/services";
import "./profile.css";
import { errorHandler } from "../../shared/handler/errors";
import { api } from "../../utils";
import { lotinKirilOtkazish } from "../../utils/functions/lotin-kiril";
export const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/driver/me");
      const driver = response.data.data;
      setData(driver);
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="Profile">
      <Header title={"Mening Hisobim"} />
      <div className="Profile__content">
        <div className="Profile__image">
          <div className="Profile__field">
            <img src={api + data.image} alt="" />
          </div>
        </div>
        <div className="ProfileContent__option">
          <h2 className="ProfileContentTitle">
            {lotinKirilOtkazish(data.first_name)}
            {"  "}
            {lotinKirilOtkazish(data.last_name)}
          </h2>
          <h2 className="ProfileContentRole">
            {lotinKirilOtkazish("Haydovchi")}
          </h2>
          <h2 className="ProfileContentMoney">
            {lotinKirilOtkazish(`${data.balans}  SO'M`) ||
              lotinKirilOtkazish("Nomalum")}
          </h2>
        </div>
      </div>
      <div className="Profile__detail">
        <div className="ProfileDetail__option">
          <p>{lotinKirilOtkazish("Yosh")}:</p>
          <p>{data.age}</p>
        </div>
        <div className="ProfileDetail__option">
          <p>{lotinKirilOtkazish("Telefon Raqam")}:</p>
          <p>{data.phone_number}</p>
        </div>
        <div className="ProfileDetail__option">
          <p>{lotinKirilOtkazish("Username")}:</p>
          <p>@{data.username}</p>
        </div>
        <div className="ProfileDetail__option">
          <p>{lotinKirilOtkazish("Parol")}:</p>
          <p>*********</p>
        </div>
        <div className="ProfileDetail__option">
          <p>{lotinKirilOtkazish("Manzil")}:</p>
          <p>{lotinKirilOtkazish(data.address)}</p>
        </div>
        <div className="ProfileDetail__option upto_down">
          <p>{lotinKirilOtkazish("Admin")}:</p>
          <p>{data.admin_name}</p>
        </div>
        <div className="ProfileDetail__option">
          <p>{lotinKirilOtkazish("Mashina")}:</p>
          <p>{data.car_model || "UNKW"}</p>
        </div>
        <div className="ProfileDetail__option">
          <p>{lotinKirilOtkazish("Moshina raqami")}:</p>
          <p>{data.car_number}</p>
        </div>
        <div className="ProfileDetail__option">
          <p>{lotinKirilOtkazish("Moshina rangi")}:</p>
          <p>{data.car_color}</p>
        </div>
        <div className="ProfileDetail__option upto_down">
          <p>{lotinKirilOtkazish("Hozir")}:</p>
          <p>
            {data.active
              ? lotinKirilOtkazish("ISHDA")
              : lotinKirilOtkazish("ISHDA EMAS")}
          </p>
        </div>
      </div>
      <ActiveDriver active={data.active} fetchData={fetchData} />
      <Sitebar />
    </div>
  );
};
