import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DashboardHeader } from "../../../../components";
import { DashboardSidebar } from "../../../../layouts";
import { socket } from "../../../../App";
import {
  axiosAdmin,
  errorHandler,
  error_notify,
  success_notify,
  warning_notify,
} from "../../../../shared";
import "./add-order.css";
export const AddOrderDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [addressArr, setAddressArr] = useState([]);
  const [district, setDistrict] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const handleChange = (e, element) => {
    element(e.target.value);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
    fetchDataRM();
  }, [id]); // Use id as a dependency for useEffect

  const fetchDataRM = async () => {
    try {
      const {
        data: { data: addresses },
      } = await axiosAdmin.get("/address");

      setAddress(addresses[0]?.id);

      setAddressArr(addresses);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  };

  const fetchData = async () => {
    // const {
    //   data: { data: models },
    // } = await axiosAdmin.get("/car-model");
    // const edited_model = models.find((m) => m.id == id);
    // setModel(edited_model.model);
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    let regex = /^\+998\d{2}\d{3}\d{4}$/;

    if (!regex.test(phone_number)) {
      warning_notify("Telefon raqam formati xato!");
      return;
    }

    const new_order = { phone_number, district, address_id: address };

    if (id) {
      // editModel(new_order);
    } else {
      createOrder(new_order);
    }
  };

  const createOrder = async (data) => {
    try {
      const response = await axiosAdmin.post("/order", data);
      if (response.status === 201) {
        success_notify("Buyutma yaratildi!");
        socket.emit("add_order", { msg: "go" });
        navigate("/dashboard/order");
      }
    } catch (error) {
      error_notify(error?.response?.data?.error || "Xatolik Bor!");
      errorHandler(error);
    }
  };

  // const editModel = async (data) => {
  //   try {
  //     const response = await axiosAdmin.put("/car-model/" + id, data);
  //     if (response.status === 200) {
  //       success_notify("Model o'zgartirildi!");
  //       navigate("/dashboard/model");
  //     }
  //   } catch (error) {
  //     error_notify(error.response.data.error);
  //     errorHandler(error);
  //   }
  // };

  return (
    <div className="DashboardConfig">
      <DashboardSidebar />
      <div className="AddModelDashboard">
        <DashboardHeader title={id ? 'Edit " Order "' : 'Create " Order "'} />

        <div className="DashboardHeadOption">
          <Link to="/dashboard/order" className="DashboardHeadOption__button">
            <i className="fa-solid fa-chevron-left icon"></i>
            Back to "Order Panel"
          </Link>
        </div>

        <div className="AddModelDashboard__content">
          <div className="form-wrapper">
            <h2>{id ? "Edit Order" : "Create Order"} </h2>
            <form onSubmit={(e) => handleCreateOrder(e)}>
              <div className="form-control">
                <select
                  className="AddCarDashboard__select"
                  onChange={(e) => handleChange(e, setAddress)}
                  value={address}
                  required
                >
                  {addressArr.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.address}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <input
                  type="name"
                  value={district}
                  onChange={(e) => handleChange(e, setDistrict)}
                  required
                />
                <label>District</label>
              </div>
              <div className="form-control">
                <input
                  type="tel"
                  value={phone_number}
                  onChange={(e) => handleChange(e, setPhoneNumber)}
                  required
                />
                <label>Phone Number</label>
              </div>
              <button>{id ? "Edit Order" : "Create Order"} </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
