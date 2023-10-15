import { Fragment, useEffect, useState } from "react";
import { Header, Loader, NoActive } from "../../components";
import { Sitebar } from "../../layouts";
import "./maps.css";
import { axiosInstance } from "../../shared/services";
import { errorHandler } from "../../shared/handler/errors";
export const Maps = () => {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const changeActive = () => {
    setActive(false);
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/address");
      const base = response.data.data;
      setData(base);
      if (response.status == 200) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errorHandler(error, changeActive);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="Maps">
      <Header title={"Manzillar"} />
      <div className="Maps__container">
        {!active ? (
          <NoActive />
        ) : (
          <Fragment>
            {data.map((item) => (
              <div className="Maps__box" key={item.id}>
                <h3 className="Maps__address">{item.address}</h3>
                <div className="Maps__details">
                  <i className="fa-solid fa-ellipsis icon"></i>
                </div>
              </div>
            ))}
            <h1 className="Maps__count">- {data.length} ta manzil topildi -</h1>
          </Fragment>
        )}
      </div>
      <Sitebar />
    </div>
  );
};
