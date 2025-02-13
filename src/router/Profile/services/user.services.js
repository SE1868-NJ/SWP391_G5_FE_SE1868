import axiosInstance from "./axiosInstance";

export const getCurrentCustomerById = async (customerId) => {
  const response = await axiosInstance.get(`/customers/${customerId}`);
  return response.data;
};

export const updateCustomerById = async (customerId, dataBody) => {
  const response = await axiosInstance.put(
    `/customers/${customerId}`,
    dataBody
  );
  return response.data;
};
