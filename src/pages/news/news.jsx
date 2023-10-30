import { useState } from "react";
import { Build, Header } from "../../components";
import { Sitebar } from "../../layouts";
import "./news.css";
export const News = () => {
  const [isBuild, setBuild] = useState(true);

  return (
    <div className="News">
      <Header title={"Yangiliklar"} />
      {isBuild ? <Build /> : ""}
      <Sitebar />
    </div>
  );
};
