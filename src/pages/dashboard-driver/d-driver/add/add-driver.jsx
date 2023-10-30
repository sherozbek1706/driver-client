import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DashboardHeader, Loader } from "../../../../components";
import { DashboardSidebar } from "../../../../layouts";
import {
  axiosAdmin,
  errorHandler,
  error_notify,
  success_notify,
  warning_notify,
} from "../../../../shared";
import "./add-driver.css";

export const AddDriverDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [image, setImage] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [car_id, setCar_id] = useState(0);
  const [carArr, setCarArr] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleChange = (e, element) => {
    element(e.target.value);
  };

  useEffect(() => {
    fetchDataRM();
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    const {
      data: { data: drivers },
    } = await axiosAdmin.get("/driver");

    const edited_driver = drivers.find((m) => m.id == id);

    setAge(edited_driver.age);
    setUsername(edited_driver.username);
    setCar_id(edited_driver.car_id);
    // setPassword(edited_driver.password);
    setPhone_number(edited_driver.phone_number);
    setLast_name(edited_driver.last_name);
    setFirst_name(edited_driver.first_name);
    setAddress(edited_driver.address);
  };

  const fetchDataRM = async () => {
    try {
      const {
        data: { data: cars },
      } = await axiosAdmin.get("/car");

      const {
        data: { data: cars_without_driver },
      } = await axiosAdmin.get("/car/add-driver");

      if (!id) {
        setCarArr(cars_without_driver);
        setCar_id(cars_without_driver[0]?.id);
      } else {
        setCarArr(cars);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  };

  const handleChangeFileInput = (e) => {
    const file = e.target.files[0];
    let doc = document.querySelector(
      ".AddDriverDashboard__content__fill_label"
    );
    if (file) {
      doc.classList.add("filltheimage");
      doc.textContent = file.name;
      setImage(file);
    } else {
      doc.classList.remove("filltheimage");
      doc.innerHTML = "Choose a Photo";
      setImage({});
    }
  };

  const handleCreateDriver = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("age", age);
    formData.append("phone_number", phone_number);
    formData.append("address", address);
    formData.append("image", image);
    formData.append("car_id", +car_id);
    formData.append("username", username);
    formData.append("password", password);

    if (id) {
      editDriver(formData);
      return;
    }

    if (!image.name) {
      warning_notify("Rasm tanlanmagan!");
      return;
    }

    create(formData);
  };

  const editDriver = async (data) => {
    try {
      const response = await axiosAdmin.put("/driver/" + id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if ((response.status = 200)) {
        success_notify("Haydovchi o'zgartirildi.");
        navigate("/dashboard/driver");
      }
    } catch (error) {
      error_notify(error.response.data.error);
      errorHandler(error);
    }
  };

  const create = async (data) => {
    try {
      const response = await axiosAdmin.post("/driver/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if ((response.status = 201)) {
        success_notify("Haydovchi yaratildi.");
        navigate("/dashboard/driver");
      }
    } catch (error) {
      error_notify(error.response.data.error);
      errorHandler(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="DashboardConfig">
      <DashboardSidebar />
      <div className="AddDriverDashboard">
        <DashboardHeader title={id ? 'Edit " Driver "' : 'Create " Driver "'} />

        <div className="DashboardHeadOption">
          <Link to="/dashboard/driver" className="DashboardHeadOption__button">
            <i className="fa-solid fa-chevron-left icon"></i>
            Back to "Drivers Panel"
          </Link>
        </div>

        <div className="AddDriverDashboard__content">
          <div className="form-wrapper">
            <h2>{id ? "Edit Driver" : "Create Driver"} </h2>
            <form onSubmit={(e) => handleCreateDriver(e)}>
              {/* <form> */}
              <div className="form-control">
                <input
                  type="text"
                  value={first_name}
                  onChange={(e) => handleChange(e, setFirst_name)}
                  required
                />
                <label className="AddDriverDashboard__content__label">
                  First Name
                </label>
              </div>
              <div className="form-control">
                <input
                  type="text"
                  value={last_name}
                  onChange={(e) => handleChange(e, setLast_name)}
                  required
                />
                <label className="AddDriverDashboard__content__label">
                  Last Name
                </label>
              </div>
              <div className="form-control">
                <input
                  type="number"
                  value={age}
                  onChange={(e) => handleChange(e, setAge)}
                  required
                />
                <label className="AddDriverDashboard__content__label">
                  Age
                </label>
              </div>
              <div className="form-control">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => handleChange(e, setAddress)}
                  required
                />
                <label className="AddDriverDashboard__content__label">
                  Address
                </label>
              </div>
              <div className="form-control">
                <input
                  type="text"
                  value={phone_number}
                  onChange={(e) => handleChange(e, setPhone_number)}
                  required
                />
                <label className="AddDriverDashboard__content__label">
                  Phone Number
                </label>
              </div>
              <div className="form-control">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => handleChange(e, setUsername)}
                  required
                />
                <label className="AddDriverDashboard__content__label">
                  Username
                </label>
              </div>
              <div className="form-control">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => handleChange(e, setPassword)}
                  required={id ? false : true}
                />
                <label className="AddDriverDashboard__content__label">
                  Password
                </label>
              </div>

              <div className="form-control">
                <select
                  className="AddCarDashboard__select"
                  onChange={(e) => handleChange(e, setCar_id)}
                  required
                  value={car_id}
                >
                  {carArr.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item?.color} | {item?.car_model || "UNKW"} | {item.year}{" "}
                      | {item?.car_region_number || "UNKW"} {item?.number}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <input
                  type="file"
                  className="AddDriverDashboard__content__fill_input"
                  name="image"
                  placeholder="Fill in the Photo"
                  accept="image/*"
                  onChange={(e) => handleChangeFileInput(e)}
                  id="inputField"
                />
                <label
                  htmlFor="inputField"
                  className="AddDriverDashboard__content__fill_label"
                >
                  Choose a Photo
                </label>
              </div>
              <button>{id ? "Edit Driver" : "Create Driver"} </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
