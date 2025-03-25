import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const [inforFullUser, setInforFullUser] = useState(null);
    const [cusID, setCusID] = useState(null);

    useEffect(() => {
        const inforFullUser = localStorage.getItem("user");
        if (inforFullUser) {
          const user = JSON.parse(inforFullUser);
          setCusID(user.id);
        }
      }, [inforFullUser]);

    const fetchCartCount = async () => {
        try {
            if (!cusID) return;
            const response = await axios.post("http://localhost:3001/api/Cart/cusID", {
                cusID: cusID,
            });
            
            if (Array.isArray(response.data)) {
                const cartItems = response.data.length;
                setCartCount(cartItems);
            }
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, [cusID]);

    return (
        <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount }}>
            {children}
        </CartContext.Provider>
    );
};