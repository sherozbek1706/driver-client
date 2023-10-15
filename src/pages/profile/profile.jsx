import { useEffect, useState } from "react";
import { ActiveDriver, Header, Loader } from "../../components";
import { Sitebar } from "../../layouts";
import { axiosInstance } from "../../shared/services";
import "./profile.css";
import { errorHandler } from "../../shared/handler/errors";
import { api } from "../../utils";
export const Profile = () => {
  return (
    <div className="Profile">
      <Header title={"Mening Hisobim"} />
      <div className="Profile__image">
        <div className="Profile__field">
          <img src={api + data.image} alt="" />
        </div>
      </div>
      <div className="Profile__name">
        <h1>
          {data.first_name}
          {"  "}
          {data.last_name}
        </h1>
      </div>
      <div className="Profile__detail">
        <div className="ProfileDetail__option">
          <p>Yosh:</p>
          <p>{data.age}</p>
        </div>
        <div className="ProfileDetail__option">
          <p>Telefon Raqam:</p>
          <p>{data.phone_number}</p>
        </div>
        <div className="ProfileDetail__option">
          <p>Username:</p>
          <p>@{data.username}</p>
        </div>
        <div className="ProfileDetail__option">
          <p>Parol:</p>
          <p>*********</p>
        </div>
        <div className="ProfileDetail__option">
          <p>Manzil:</p>
          <p>{data.address}</p>
        </div>
        <div className="ProfileDetail__option upto_down">
          <p>Admin:</p>
          <p>{data.admin_name}</p>
        </div>
        <div className="ProfileDetail__option">
          <p>Mashina:</p>
          <p>{data.car_model}</p>
        </div>
        <div className="ProfileDetail__option">
          <p>Moshina raqami:</p>
          <p>{data.car_number}</p>
        </div>
        <div className="ProfileDetail__option">
          <p>Moshina rangi:</p>
          <p>{data.car_color}</p>
        </div>
  );
};
