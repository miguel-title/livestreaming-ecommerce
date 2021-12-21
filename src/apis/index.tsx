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

export const UploadImage = async (data: any) => {
  try {
    const response = await axios.post<{}>(`${ServerUrl}/vendor/upload`, data);
    if (response.status === 200) return response.data;
    else return [];
  } catch (err) {
    return err;
  }
};

export const UpdateAccount = async (data: any) => {
  try {
    const response = await axios.post<{}>(
      `${ServerUrl}/vendor/updateAccount`,
      data
    );
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

export const GetAccountInfo = async (id: string) => {
  try {
    const response = await axios.post<{}>(`${ServerUrl}/vendor/accountInfo`, {
      id: id,
    });
    if (response.status === 200) return response.data;
    else return [];
  } catch (err) {
    return err;
  }
};
