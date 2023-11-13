import { errorHandler } from "../../../shared/handler/errors";
import { success_notify } from "../../../shared/notify";
import { axiosInstance } from "../../../shared/services";
import { socket } from "../../../App";
import "./active-driver.css";
import { lotinKirilOtkazish } from "../../../utils/functions/lotin-kiril";
export const ActiveDriver = ({ active, fetchData }) => {
  const handleSwitchOffActive = async () => {
    try {
      const response = await axiosInstance.patch("/driver/active/off");
      if (response.status == 200) {
        success_notify("Siz ishni to'xtatdingiz.");
        socket.emit("hayvochini_activligini_almashtirish", { msg: "go" });
        fetchData();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleSwitchOnActive = async () => {
    try {
      const response = await axiosInstance.patch("/driver/active/on");
      if (response.status == 200) {
        success_notify("Siz ishni boshladingiz");
        socket.emit("hayvochini_activligini_almashtirish", { msg: "go" });
        fetchData();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="ActiveDriver">
      {active ? (
        <button
          className="ActiveDriver_btn active"
          onClick={handleSwitchOffActive}
        >
          {lotinKirilOtkazish("Ishni to'xtatish")}
        </button>
      ) : (
        <button
          className="ActiveDriver_btn no_active"
          onClick={handleSwitchOnActive}
        >
          {lotinKirilOtkazish("Ishni Boshlash")}
        </button>
      )}
    </div>
  );
};
