import axios from "axios";
import { api } from "../../utils";
const ACCESS_TOKEN = localStorage.getItem("token") || "";
export const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    Authorization: ACCESS_TOKEN,
  },
});
