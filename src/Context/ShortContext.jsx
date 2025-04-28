import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const ShopContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'; 

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = { ...cartItems };
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        totalCount += cartItems[items][item];
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (itemInfo && cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  const getProductData = async () => {
    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        toast.error("No token found. Please login.");
        navigate("/login");
        return;
      }
      const res = await axios.get(`${backendUrl}/api/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
  };
  
  useEffect(() => {
    getProductData();
  }, []);

  const value = {   // <-- you forgot this earlier
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
