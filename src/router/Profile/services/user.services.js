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

export const getAddressByCustomerId = async (customerId) => {
  const response = await axiosInstance.get(`/address/${customerId}`);
  return response.data;
};


export const updateAddressById = async (addressId, addressData) => {
  const response = await axiosInstance.put(`/address/${addressId}`, addressData);
  return response.data;
};


export const addAddress = async (customerID, houseAddress, area) => {
  try {
      console.log("Gửi dữ liệu lên backend:", { customerID, houseAddress, area });

      const response = await axiosInstance.post('/address', {
          customerID, houseAddress, area
      });

      console.log("Phản hồi từ API:", response.data);
      return response.data;
  } catch (error) {
      console.error("Lỗi từ API khi thêm địa chỉ:", error.response ? error.response.data : error.message);
      throw error;
  }
};




export const removeAddress = async (addressId, customerId) => {
  const response = await axiosInstance.delete(`/address`, {
    params: { addressId, customerId },
  });
  return response.data;
};