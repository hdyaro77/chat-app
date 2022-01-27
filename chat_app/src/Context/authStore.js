import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import { useUtility } from "./utilityStore";
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthHandler = ({ children, history }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const { loadingHandler, errorHandler } = useUtility();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  ///////////////////////////////////////////////////////////
  const login = async (event) => {
    event.preventDefault();
    loadingHandler({ status: true, message: "Please wait.." });
    const loginCredential = { email: event.target[0].value, password: event.target[1].value };
    try {
      const res = await axios.post("/user/login", loginCredential);
      const token = res.data?.token;

      if (token) {
        setisLoggedIn(true);
        setUser(res.data.data.user);
        localStorage.setItem("token", token);
        localStorage.setItem("user_data", JSON.stringify(res.data?.data?.user));
        navigate("/home/profile");
      } else {
        throw new Error("user not found !");
      }
      loadingHandler({ status: false, message: "Please wait.." });
    } catch (err) {
      console.log(err.toString());
      loadingHandler({ status: false, message: "Please wait.." });
    }
  };

  ///////////////////////////////////////////////////////////
  const logout = () => {
    loadingHandler({ status: true, message: "Please wait.." });
    setisLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    navigate("/");
    loadingHandler({ status: false, message: "Please wait.." });
  };

  /////////////////////////////////////////////////////////
  const update = () => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    console.log(userData);
    axios
      .get(`/user?id=${userData._id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data?.data?.users[0]);
        // localStorage.setItem("user_data", res.data?.data?.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //////////////////////////////////////////////////////////
  const signUp = async (event) => {
    event.preventDefault();

    loadingHandler({ status: true, message: "Please wait.." });
    const signUpCredential = {
      name: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value,
      confirmPassword: event.target[3].value,
    };
    try {
      const res = await axios.post("/user/signup", signUpCredential);
      const token = res.data?.token;
      if (token) {
        setisLoggedIn(true);
        setUser(res.data.data.user);
        localStorage.setItem("token", token);
        localStorage.setItem("user_data", JSON.stringify(res.data?.data?.user));
        navigate("/home/profile");
      } else {
        throw new Error("user not found !");
      }
      loadingHandler({ status: false, message: "Please wait.." });
    } catch (err) {
      console.log(err.toString());
      loadingHandler({ status: false, message: "Please wait.." });
    }
  };

  ///////////////////////////////////////////////////////////
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setisLoggedIn(true);
      update();
      const userData = localStorage.getItem("user_data");
      setUser(JSON.parse(userData));
    }
  }, []);
  const value = {
    isLoggedIn,
    user,
    login,
    logout,
    signUp,
    update,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
