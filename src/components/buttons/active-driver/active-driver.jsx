import { errorHandler } from "../../../shared/handler/errors";
import { success_notify } from "../../../shared/notify";
import { axiosInstance } from "../../../shared/services";
import "./active-driver.css";
export const ActiveDriver = ({ active, fetchData }) => {
  const handleSwitchOffActive = async () => {
    try {
      const response = await axiosInstance.patch("/driver/active/off");
      if (response.status == 200) {
        success_notify("Siz ishni to'xtatdingiz.");
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
          Ishni to'xtatish
        </button>
      ) : (
        <button
          className="ActiveDriver_btn no_active"
          onClick={handleSwitchOnActive}
        >
          Ishni Boshlash
        </button>
      )}
    </div>
  );
};
