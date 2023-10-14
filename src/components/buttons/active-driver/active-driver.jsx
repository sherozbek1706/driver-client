import { errorHandler } from "../../../shared/handler/errors";
import { success_notify } from "../../../shared/notify";
import { axiosInstance } from "../../../shared/services";
import "./active-driver.css";
export const ActiveDriver = ({ active, fetchData }) => {
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
