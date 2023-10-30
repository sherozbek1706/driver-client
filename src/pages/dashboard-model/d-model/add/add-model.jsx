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
import "./add-model.css";
export const AddModelDashboard = () => {
  const [model, setModel] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const handleChangeModel = (e) => {
    setModel(e.target.value);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]); // Use id as a dependency for useEffect

  const fetchData = async () => {
    const {
      data: { data: models },
    } = await axiosAdmin.get("/car-model");

    const edited_model = models.find((m) => m.id == id);

    setModel(edited_model.model);
  };

  const handleCreateModel = (e) => {
    e.preventDefault();
    const new_model = { model: model.trim() };
    if (id) {
      editModel(new_model);
    } else {
      createModel(new_model);
    }
  };

  const createModel = async (data) => {
    try {
      const response = await axiosAdmin.post("/car-model", data);
      if (response.status === 201) {
        success_notify("Model yaratildi!");
        navigate("/dashboard/model");
      }
    } catch (error) {
      error_notify(error.response.data.error);
      errorHandler(error);
    }
  };

  const editModel = async (data) => {
    try {
      const response = await axiosAdmin.put("/car-model/" + id, data);
      if (response.status === 200) {
        success_notify("Model o'zgartirildi!");
        navigate("/dashboard/model");
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
        <DashboardHeader
          title={id ? 'Edit " Car Model "' : 'Create " Car Model "'}
        />

        <div className="DashboardHeadOption">
          <Link to="/dashboard/model" className="DashboardHeadOption__button">
            <i className="fa-solid fa-chevron-left icon"></i>
            Back to "Car Model Panel"
          </Link>
        </div>

        <div className="AddModelDashboard__content">
          <div className="form-wrapper">
            <h2>{id ? "Edit Model" : "Create Model"} </h2>
            <form onSubmit={(e) => handleCreateModel(e)}>
              <div className="form-control">
                <input
                  type="name"
                  value={model}
                  onChange={(e) => handleChangeModel(e)}
                  required
                />
                <label>Model</label>
              </div>
              <button>{id ? "Edit Model" : "Create Model"} </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
