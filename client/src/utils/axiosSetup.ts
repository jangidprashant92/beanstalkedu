import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import apiContants from "../constants/api";

const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "Api-key": process.env.API_KEY,
  },
};

const axiosInstance = axios.create(axiosRequestConfiguration);

export default axiosInstance;
