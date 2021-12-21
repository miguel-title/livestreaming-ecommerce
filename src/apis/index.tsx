import axios from "../utils/axios";

import config from "../assets/config.json";

const ServerUrl = config.ServerUrl;

export const Register = async (data: any) => {
  try {
    const response = await axios.post<{}>(`${ServerUrl}/vendor/register`, data);
    if (response.status === 200) return response.data;
    else return [];
  } catch (err) {
    return err;
  }
};

export const Login = async (data: any) => {
  try {
    const response = await axios.post<{}>(`${ServerUrl}/vendor/login`, data);
    if (response.status === 200) return response.data;
    else return [];
  } catch (err) {
    return err;
  }
};
