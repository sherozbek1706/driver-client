import { Fragment, useEffect, useState } from "react";
import { Header, Loader, NoActive } from "../../components";
import { Sitebar } from "../../layouts";
import "./maps.css";
import { axiosInstance } from "../../shared/services";
import { errorHandler } from "../../shared/handler/errors";
export const Maps = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="Maps">
      <Header title={"Manzillar"} />
      <div className="Maps__container">
      </div>
      <Sitebar />
    </div>
  );
};
