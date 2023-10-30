import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DashboardHeader, Loader } from "../../../../components";
import { DashboardSidebar } from "../../../../layouts";
import {
  axiosAdmin,
  errorHandler,
  error_notify,
  success_notify,
} from "../../../../shared";
import "./add-car.css";
export const AddCarDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("");
  const [year, setYear] = useState();
  const [number, setNumber] = useState("");
  const [modelArr, setModelArr] = useState([]);
  const [regionArr, setRegionArr] = useState([]);
  const [model, setModel] = useState("");
  const [region, setRegion] = useState("0");
  const { id } = useParams();

  const navigate = useNavigate();

  const handleChangeColor = (e) => {
    setColor(e.target.value);
  };
  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };
  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };
  const handleChangeModel = (e) => {
    setModel(e.target.value);
  };
  const handleChangeRegion = (e) => {
    setRegion(e.target.value);
  };

  useEffect(() => {
    fetchDataRM();
    if (id) {
      fetchData();
    }
  }, [id]); // Use id as a dependency for useEffect

  const fetchDataRM = async () => {
    try {
      const {
        data: { data: car_model },
      } = await axiosAdmin.get("/car-model");
      const {
        data: { data: car_region },
      } = await axiosAdmin.get("/car-region");
      setRegionArr(car_region);
      setModelArr(car_model);

      if (!id) {
        setRegion(car_region[0]?.id);
        setModel(car_model[0]?.id);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  };

  const fetchData = async () => {
    const {
      data: { data: cars },
    } = await axiosAdmin.get("/car");

    const edited_car = cars.find((m) => m.id == id);

    setModel(edited_car.model_id);
    setRegion(edited_car.region_id);
    setColor(edited_car.color);
    setYear(edited_car.year);
    setNumber(edited_car.number);
  };

  const handleCreateCar = (e) => {
    e.preventDefault();
    const new_car = {
      year,
      color: color.toUpperCase(),
      number: number.toUpperCase(),
      model_id: model,
      region_id: region,
    };
    if (id) {
      editCar(new_car);
    } else {
      createCar(new_car);
    }
  };

  const createCar = async (data) => {
    try {
      const response = await axiosAdmin.post("/car", data);
      if (response.status == 201) {
        success_notify("Car yaratildi!");
        navigate("/dashboard/cars");
      }
    } catch (error) {
      error_notify(error.response.data.error);
      errorHandler(error);
    }
  };

  const editCar = async (data) => {
    try {
      const response = await axiosAdmin.put("/car/" + id, data);
      if (response.status == 200) {
        success_notify("Car o'zgartirildi!");
        navigate("/dashboard/cars");
      }
    } catch (error) {
      error_notify(error.response.data.error);
      errorHandler(error);
    }
  };

  return (
    <div className="DashboardConfig">
      <DashboardSidebar />
      {loading ? (
        <Loader />
      ) : (
        <div className="AddModelDashboard">
          <DashboardHeader title={id ? 'Edit " Car "' : 'Create " Car "'} />

          <div className="DashboardHeadOption">
            <Link to="/dashboard/cars" className="DashboardHeadOption__button">
              <i className="fa-solid fa-chevron-left icon"></i>
              Back to "Cars Panel"
            </Link>
          </div>

          <div className="AddCarDashboard__content">
            <div className="form-wrapper">
              <h2>{id ? "Edit Car" : "Create Car"} </h2>
              <form onSubmit={(e) => handleCreateCar(e)}>
                <div className="form-control">
                  <select
                    className="AddCarDashboard__select"
                    onChange={(e) => handleChangeRegion(e)}
                    value={region}
                    required
                  >
                    {regionArr.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.region}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <select
                    className="AddCarDashboard__select"
                    onChange={(e) => handleChangeModel(e)}
                    required
                    value={model}
                  >
                    {modelArr.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.model}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => handleChangeColor(e)}
                    required
                  />
                  <label>Color</label>
                </div>

                <div className="form-control">
                  <input
                    type="number"
                    min={"1920"}
                    max={"2030"}
                    value={year}
                    onChange={(e) => handleChangeYear(e)}
                    required
                  />
                  <label>Year</label>
                </div>

                <div className="form-control">
                  <input
                    type="text"
                    value={number}
                    onChange={(e) => handleChangeNumber(e)}
                    required
                  />
                  <label>Number</label>
                </div>

                <button>{id ? "Edit Car" : "Create Car"} </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
