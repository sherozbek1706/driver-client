import axios from "axios";
import { api } from "../../utils";
const ACCESS_TOKEN = localStorage.getItem("admin_token") || "";
export const axiosAdmin = axios.create({
  baseURL: api,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    Authorization: ACCESS_TOKEN,
  },
});
