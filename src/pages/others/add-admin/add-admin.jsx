import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DashboardHeader, Loader } from "../../../components";
import { DashboardSidebar } from "../../../layouts";
import {
  axiosAdmin,
  errorHandler,
  error_notify,
  success_notify,
  warning_notify,
} from "../../../shared";
import "./add-admin.css";

export const FormAdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [image, setImage] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const navigate = useNavigate();

  const { id } = useParams();

  const handleChange = (e, element) => {
    element(e.target.value);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
    fetchDataRM();
  }, [id]);

  const fetchDataRM = () => {
    setLoading(false);
  };

  const fetchData = async () => {
    try {
      const {
        data: { data: admins },
      } = await axiosAdmin.get("/admin");

      const edited__admin = admins.find((a) => a.id == id);

      setAge(edited__admin.age);
      setUsername(edited__admin.username);
      setRole(edited__admin.role);
      // setPassword(edited__admin.password);
      setPhone_number(edited__admin.phone_number);
      setLast_name(edited__admin.last_name);
      setFirst_name(edited__admin.first_name);
      setAddress(edited__admin.address);
      setLoading(false);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
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

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("age", age);
    formData.append("phone_number", phone_number);
    formData.append("address", address);
    formData.append("image", image);
    formData.append("role", role);
    formData.append("username", username);
    formData.append("password", password);

    if (id) {
      edit(formData);
      return;
    }

    if (!image.name) {
      warning_notify("Rasm tanlanmagan!");
      return;
    }

    create(formData);
  };

  const edit = async (data) => {
    try {
      const response = await axiosAdmin.put("/admin/" + id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if ((response.status = 200)) {
        success_notify("Admin o'zgartirildi.");
        navigate("/dashboard/others/admins");
      }
    } catch (error) {
      error_notify(error.response.data.error);
      errorHandler(error);
    }
  };

  const create = async (data) => {
    try {
      const response = await axiosAdmin.post("/admin", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if ((response.status = 201)) {
        success_notify("Admin yaratildi.");
        navigate("/dashboard/others/admins");
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
        <DashboardHeader title={id ? 'Edit " Admin "' : 'Create " Admin "'} />

        <div className="DashboardHeadOption">
          <Link
            to="/dashboard/others/admins"
            className="DashboardHeadOption__button"
          >
            <i className="fa-solid fa-chevron-left icon"></i>
            Back to "Admins Panel"
          </Link>
        </div>

        <div className="AddDriverDashboard__content">
          <div className="form-wrapper">
            <h2>{id ? "Edit Admin" : "Create Admin"} </h2>
            <form onSubmit={(e) => handleCreateAdmin(e)}>
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
                  onChange={(e) => handleChange(e, setRole)}
                  required
                  value={role}
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
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
              <button>{id ? "Edit Admin" : "Create Admin"} </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
