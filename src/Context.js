import React, { createContext, useState, useContext } from "react";

const CustomerContext = createContext(null);

const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState({
    CustomerID: 1,
    FirstName: 'John',
    LastName: 'Doe',
    DateOfBirth: '1990-01-15 00:00:00',
    BankAccountNumber: '123456789',
    Email:'john.doe@email.com',
    PhoneNumber: '0123456789',
    Gender: 1,
    Avatar:'https://res.cloudinary.com/div6eqrog/image/upload/v1738852801/download-removebg-preview_f8mfej.png',
    status: 'active'
  });
  const updateCustomer = (value)=>{
    setCustomer(value)
  }


  return (
    <CustomerContext.Provider value={{ customer, updateCustomer}}>
      {children}
    </CustomerContext.Provider>
  );
};

const useCustomer = () => {
  return useContext(CustomerContext);
};

export { CustomerProvider, useCustomer };
