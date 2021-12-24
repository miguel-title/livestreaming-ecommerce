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

export const AdminRegister = async () => {
  try {
    const response = await axios.post<{}>(`${ServerUrl}/vendor/adminregister`);
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

export const UploadBlogImage = async (data: any) => {
  try {
    const response = await axios.post<{}>(
      `${ServerUrl}/vendor/uploadBlog`,
      data
    );
    if (response.status === 200) return response.data;
    else return [];
  } catch (err) {
    return err;
  }
};

export const UpdateAccount = async (data: any) => {
  console.log(data, "aaa");
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

export const GetAccountInfo = async (id: any) => {
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

export const GetBlogs = async (count: number) => {
  try {
    const response = await axios.post<{}>(`${ServerUrl}/vendor/getBlogs`, {
      count: count,
    });
    if (response.status === 200) return response.data;
    else return [];
  } catch (err) {
    return [];
  }
};

export const GetBlog = async (id: any) => {
  try {
    const response = await axios.post<{}>(`${ServerUrl}/vendor/getBlog`, {
      id: id,
    });
    if (response.status === 200) return response.data;
    else return { image: "", name: "", title: "" };
  } catch (err) {
    return { image: "", name: "", title: "" };
  }
};

export const DeleteBlog = async (id: string) => {
  try {
    const response = await axios.post<{}>(`${ServerUrl}/vendor/deleteBlog`, {
      id: id,
    });

    if (response.status === 200) return true;
    else return false;
  } catch (err) {
    return false;
  }
};

export const InsertBlog = async (blog: any) => {
  try {
    const response = await axios.post<{}>(
      `${ServerUrl}/vendor/insertBlog`,
      blog
    );
    if (response.status === 200) return response.data;
    else return [];
  } catch (err) {
    return [];
  }
};

export const UpdateBlog = async (blog: any) => {
  try {
    const response = await axios.post<{}>(
      `${ServerUrl}/vendor/updateBlog`,
      blog
    );
    if (response.status === 200) return response.data;
    else return [];
  } catch (err) {
    return [];
  }
};

export const GetSellers = async (count: number) => {
  try {
    const response = await axios.post<{}>(`${ServerUrl}/vendor/getSellers`, {
      count: count,
    });
    if (response.status === 200) return response.data;
    else return [];
  } catch (err) {
    return [];
  }
};

export const GetBuyers = async (count: number) => {
  try {
    const response = await axios.post<{}>(`${ServerUrl}/vendor/getBuyers`, {
      count: count,
    });
    if (response.status === 200) return response.data;
    else return [];
  } catch (err) {
    return [];
  }
};

export const DeleteUser = async (id: string) => {
  try {
    const response = await axios.post<{}>(`${ServerUrl}/vendor/deleteUser`, {
      id: id,
    });

    if (response.status === 200) return true;
    else return false;
  } catch (err) {
    return false;
  }
};

export const GetVendorPedidos = async (vendedorid: any) => {
  try {
    const response = await axios.post<{}>(
      `${ServerUrl}/vendor/getVendedorPedido`,
      {
        id: vendedorid,
      }
    );
    if (response.status === 200) return response.data;
    else return [];
  } catch (err) {
    return [];
  }
};

export const GetBuyerPedidos = async (compradorID: any) => {
  try {
    const response = await axios.post<{}>(
      `${ServerUrl}/vendor/getCompradorPedido`,
      {
        id: compradorID,
      }
    );
    if (response.status === 200) return response.data;
    else return [];
  } catch (err) {
    return [];
  }
};
