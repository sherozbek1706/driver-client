import jwtDecode from "jwt-decode";
import { Fragment, useEffect, useState } from "react";
import { socket } from "../../App";
import { Header, Loader } from "../../components";
import { Sitebar } from "../../layouts";
import { axiosInstance, errorHandler } from "../../shared";
import { api } from "../../utils";
import "./chats.css";
export const Chats = () => {
  const [isBuild, setBuild] = useState(true);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [driverId, setDriverId] = useState(0);
  const [detect, setDetect] = useState(false);

  const onChangeMessage = (e) => {
    let msg = e.target.value;
    let button = document.querySelector(".ChatsInputs__button");
    if (msg.trim().length) {
      button.classList.add("btn__active");
    } else {
      button.classList.remove("btn__active");
    }
    setMessage(msg);
  };
  const handlesendMessage = async function (e) {
    e.preventDefault();
    try {
      setLoading(true);

      let msgArr = message.split(" ");
      msgArr = msgArr.map((mes) => {
        return mes.trim();
      });
      let res = await axiosInstance.post("/driver-message", {
        message: msgArr.join(" "),
      });
      if (res.status === 201) {
        setLoading(false);
        setMessage("");
        setDetect(false);
        socket.emit("haydovchi_yangi_habar_yozdi", { msg: "go" });
      }
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (driverId === 0) {
      getDriverId();
    }

    socket.on("haydovchi_yangi_habar_yozdi_uqish_kerak", (data) => {
      setDetect(false);
    });
  }, [driverId, loading, socket, detect]);

  const getDriverId = async function () {
    try {
      let token = localStorage.getItem("token");
      let decode = jwtDecode(token);
      setDriverId(decode.user.id);
    } catch (error) {
      errorHandler(error);
    }
  };

  const formatDate = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = addLeadingZero(date.getMonth() + 1);
    const day = addLeadingZero(date.getDate());
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());
    const seconds = addLeadingZero(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const addLeadingZero = (number) => {
    return number < 10 ? "0" + number : number;
  };

  const fetchData = async function () {
    try {
      const res = await axiosInstance.get("/driver-message");
      if (res.status === 200) {
        let messenger = document.getElementById("data");
        if (!detect && messenger) {
          setDetect(true);
          messenger.scrollTop = messenger.scrollHeight;
        }
        setData(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  return (
    <div className="Chats">
      <Header title={"Chat"} />
      {/* {isBuild ? <Build /> : ""} */}

      <div className="Chats__container">
        {loading ? (
          <Loader />
        ) : (
          <div className="Chats__messages" id="data">
            {/* <div className="ChatMessage ChatMessage__right">
              <div className="ChatMessage__text">
                <h2>@sherozbek.17</h2>
                <p>
                  Assalomu Alaykum, do'stim. Mening ismim She'rozbek. Ammo man
                  hozirda maktabda o'qimayman. Qachonki toshkentga borsam, kitob
                  beraman.
                </p>
              </div>
            </div>
            <div className="ChatMessage ChatMessage__left">
              <div className="ChatMessage__text">
                <h2>@samariddin.1</h2>
                <p>
                  Osmonda ikkita kaptar, ammo bularning daftari tugaganligi
                  uchun hech narsa yemayabdi.
                </p>
              </div>
            </div> */}
            {data.map((item) => (
              <Fragment key={item.id}>
                {item.type === "message" ? (
                  <div
                    className={`ChatMessage ${
                      driverId == item.driver_id
                        ? "ChatMessage__right"
                        : "ChatMessage__left"
                    }`}
                  >
                    <div className="ChatMessage__text">
                      <h2>@{item.username}</h2>
                      <p>{item.message}</p>
                      <h6>{formatDate(item.created_at)}</h6>
                      <div className="ChatMessagePhoto">
                        <img src={api + item.image} alt="" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="ChatNotification">
                    <div className="ChatNotification__message">
                      <p>{item.message}</p>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        )}
        <form className="Chats__inputs" onSubmit={handlesendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => onChangeMessage(e)}
            placeholder="Xabar yozing..."
            className="ChatsInputs__input"
          />
          <button
            className="ChatsInputs__button"
            disabled={message.length ? false : true}
          >
            <i className="fa-solid fa-paper-plane icon"></i>
          </button>
        </form>
      </div>
      <Sitebar />
    </div>
  );
};
