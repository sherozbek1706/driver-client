import axios from "axios";
import { api } from "../../utils";
import Cookies from "js-cookie";
const ACCESS_TOKEN = Cookies.get("admin_token") || "";
export const axiosAdmin = axios.create({
  baseURL: api,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    Authorization: ACCESS_TOKEN,
  },
});
