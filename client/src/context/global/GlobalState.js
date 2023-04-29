import React, { useReducer, useEffect } from "react";
import GlobalContext from "./GlobalContext";
import GlobalReducer from "./GlobalReducer";
import axios from "axios";
import * as types from "../types";

axios.defaults.withCredentials = true;

const GlobalState = (props) => {
  const initialState = {
    isMobile: false,
    width: window.innerWidth,
    height: window.innerHeight,
    doctorSchedule: null,
    compounderSchedule: null,
    alert: null,
    loading: false,
    available: null,
    latitude: 0,
    longitude: 0,
  };

  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const setAlert = (alert) => {
    dispatch({ type: types.SET_ALERT, payload: alert });
  };

  const clearAlert = () => {
    dispatch({ type: types.CLEAR_ALERT });
  };

  const setLoading = () => {
    dispatch({ type: types.SET_LOADING });
  };

  const clearLoading = () => {
    dispatch({ type: types.CLEAR_LOADING });
  };

  const fetchLocation = async () => {
    try {
      const res = await axios.get("/api/ambulance/location");
      console.log("data from location", res.data);
      dispatch({ type: types.SET_LOCATION, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const getDoctorSchedule = async () => {
    if (!state.doctorSchedule) setLoading();
    try {
      const res = await axios.get("/api/schedule/doctors");
      dispatch({ type: types.SET_DOCTOR_SCHEDULE_SUCCESS, payload: res.data });
      clearLoading();
    } catch (err) {
      clearLoading();
      console.log(err);
      setAlert({ type: "error", message: err.response.data });
      clearAlert();
    }
  };

  const getCompounderSchedule = async () => {
    if (!state.compounderSchedule) setLoading();
    try {
      const res = await axios.get("/api/schedule/compounders");
      dispatch({
        type: types.SET_COMPOUNDER_SCHEDULE_SUCCESS,
        payload: res.data,
      });
      clearLoading();
    } catch (error) {
      clearLoading();
      console.log(error);
      setAlert({ type: "error", message: error.response.data });
      clearAlert();
    }
  };

  const getAvailable = async () => {
    if (!state.available) setLoading();
    try {
      const res = await axios.get("/api/schedule/available");
      dispatch({ type: types.SET_AVAILABLIITY_SUCCESS, payload: res.data });
      clearLoading();
    } catch (error) {
      clearLoading();
      console.log(error);
      setAlert({ type: "error", message: error.response.data });
      clearAlert();
    }
  };

  const updateDimensions = () => {
    if (typeof window !== "undefined") {
      dispatch({ type: types.SET_WIDTH });
      dispatch({ type: types.SET_HEIGHT });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  useEffect(() => {
    if (state.width < 1024) {
      dispatch({ type: types.SET_IS_MOBILE });
    } else {
      dispatch({ type: types.SET_IS_NOT_MOBILE });
    }
  }, [state.width]);

  return (
    <GlobalContext.Provider
      value={{
        doctorSchedule: state.doctorSchedule,
        compounderSchedule: state.compounderSchedule,
        isMobile: state.isMobile,
        width: state.width,
        height: state.height,
        alert: state.alert,
        loading: state.loading,
        available: state.available,
        latitude: state.latitude,
        longitude: state.longitude,
        getDoctorSchedule,
        getCompounderSchedule,
        getAvailable,
        setAlert,
        clearAlert,
        setLoading,
        clearLoading,
        fetchLocation,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
