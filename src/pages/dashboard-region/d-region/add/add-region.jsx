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
import "./add-region.css";
export const AddRegionDashboard = () => {
  const [region, setRegion] = useState("");
  const [number, setNumber] = useState(0);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleChangeRegion = (e) => {
    setRegion(e.target.value);
  };
  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]); // Use id as a dependency for useEffect

  const fetchData = async () => {
    const {
      data: { data: regions },
    } = await axiosAdmin.get("/car-region");

    const edited_region = regions.find((m) => m.id == id);

    setRegion(edited_region.region);
    setNumber(edited_region.number);
  };

  const handleCreateRegion = (e) => {
    e.preventDefault();
    const new_region = { region: region.trim(), number };
    if (id) {
      editRegion(new_region);
    } else {
      createRegion(new_region);
    }
  };

  const createRegion = async (data) => {
    try {
      const response = await axiosAdmin.post("/car-region", data);
      if (response.status == 201) {
        success_notify("Region yaratildi!");
        navigate("/dashboard/region");
      }
    } catch (error) {
      error_notify(error.response.data.error);
      errorHandler(error);
    }
  };

  const editRegion = async (data) => {
    try {
      const response = await axiosAdmin.put("/car-region/" + id, data);
      if (response.status == 200) {
        success_notify("Region o'zgartirildi!");
        navigate("/dashboard/region");
      }
    } catch (error) {
      error_notify(error.response.data.error);
      errorHandler(error);
    }
  };

  return (
    <div className="DashboardConfig">
      <DashboardSidebar />
      <div className="AddRegionDashboard">
        <DashboardHeader
          title={id ? 'Edit " Car Region "' : 'Create " Car Region "'}
        />

        <div className="DashboardHeadOption">
          <Link to="/dashboard/region" className="DashboardHeadOption__button">
            <i className="fa-solid fa-chevron-left icon"></i>
            Back to "Car Region Panel"
          </Link>
        </div>

        <div className="AddRegionDashboard__content">
          <div className="form-wrapper">
            <h2>{id ? "Edit Region" : "Create Region"} </h2>
            <form onSubmit={(e) => handleCreateRegion(e)}>
              <div className="form-control">
                <input
                  type="name"
                  value={region}
                  onChange={(e) => handleChangeRegion(e)}
                  required
                />
                <label>Region</label>
              </div>
              <div className="form-control">
                <input
                  type="number"
                  value={number}
                  onChange={(e) => handleChangeNumber(e)}
                  required
                />
                <label>Number</label>
              </div>
              <button>{id ? "Edit Region" : "Create Region"} </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
