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
import "./add-address.css";
export const AddAddressDashboard = () => {
  const [address, setAddress] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]); // Use id as a dependency for useEffect

  const fetchData = async () => {
    const {
      data: { data: addresses },
    } = await axiosAdmin.get("/address");

    const edited_address = addresses.find((m) => m.id == id);

    setAddress(edited_address.address);
  };

  const handleCreateAddress = (e) => {
    e.preventDefault();
    const new_address = { address: address.trim() };
    if (id) {
      editAddress(new_address);
    } else {
      createAddress(new_address);
    }
  };

  const createAddress = async (data) => {
    try {
      const response = await axiosAdmin.post("/address", data);
      if (response.status == 201) {
        success_notify("Address yaratildi!");
        navigate("/dashboard/address");
      }
    } catch (error) {
      error_notify(error.response.data.error);
      errorHandler(error);
    }
  };

  const editAddress = async (data) => {
    try {
      const response = await axiosAdmin.put("/address/" + id, data);
      if (response.status == 200) {
        success_notify("address o'zgartirildi!");
        navigate("/dashboard/address");
      }
    } catch (error) {
      error_notify(error.response.data.error);
      errorHandler(error);
    }
  };

  return (
    <div className="DashboardConfig">
      <DashboardSidebar />
      <div className="AddAddressDashboard">
        <DashboardHeader
          title={id ? 'Edit " Order Address "' : 'Create " Order Address "'}
        />

        <div className="DashboardHeadOption">
          <Link to="/dashboard/address" className="DashboardHeadOption__button">
            <i className="fa-solid fa-chevron-left icon"></i>
            Back to "Order Address Panel"
          </Link>
        </div>

        <div className="AddAddressDashboard__content">
          <div className="form-wrapper">
            <h2>{id ? "Edit Address" : "Create Address"} </h2>
            <form onSubmit={(e) => handleCreateAddress(e)}>
              <div className="form-control">
                <input
                  type="name"
                  value={address}
                  onChange={(e) => handleChangeAddress(e)}
                  required
                />
                <label>Address</label>
              </div>
              <button>{id ? "Edit Address" : "Create Address"} </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
