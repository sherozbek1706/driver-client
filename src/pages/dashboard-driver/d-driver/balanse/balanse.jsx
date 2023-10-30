import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DashboardHeader } from "../../../../components";
import { DashboardSidebar } from "../../../../layouts";
import {
  axiosAdmin,
  errorHandler,
  error_notify,
  success_notify,
} from "../../../../shared";
import "./balanse.css";
export const AddBalanse = () => {
  const [balanse, setBalanse] = useState(0);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleChangeBalanse = (e) => {
    const regex = /^[0-9]+$/;
    if (regex.test(e.target.value) || "") {
      setBalanse(e.target.value);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]); // Use id as a dependency for useEffect

  const fetchData = async () => {
    try {
      const res = await axiosAdmin.get("/driver/" + id);
    } catch (error) {
      navigate("/dashboard/notfound");
    }
  };

  const handleUpdateBalanse = (e) => {
    e.preventDefault();
    createModel({ balanse });
  };

  const createModel = async (data) => {
    try {
      const response = await axiosAdmin.post(`/driver/pay/${id}`, data);
      if (response.status === 200) {
        success_notify("Balanse yangilandi!");
        navigate("/dashboard/driver");
      }
    } catch (error) {
      error_notify(error.response.data.error);
      errorHandler(error);
    }
  };

  return (
    <div className="DashboardConfig">
      <DashboardSidebar />
      <div className="AddModelDashboard">
        <DashboardHeader title={'Pay "Driver Balanse"'} />

        <div className="DashboardHeadOption">
          <Link to="/dashboard/driver" className="DashboardHeadOption__button">
            <i className="fa-solid fa-chevron-left icon"></i>
            Back to "Drivers Panel"
          </Link>
        </div>

        <div className="AddModelDashboard__content">
          <div className="form-wrapper">
            <h2>Pay "Driver Balanse"</h2>
            <form onSubmit={(e) => handleUpdateBalanse(e)}>
              <div className="form-control">
                <input
                  type="number"
                  min={0}
                  value={balanse}
                  onChange={(e) => handleChangeBalanse(e)}
                  required
                />
                <label>Balanse</label>
              </div>
              <button>Pay "Driver Balanse"</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
