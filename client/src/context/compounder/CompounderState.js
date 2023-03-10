import React, { useReducer } from "react";
import CompounderContext from "./CompounderContext";
import CompounderReducer from "./CompounderReducer";
import axios from "axios";
import * as types from "../types";

axios.defaults.withCredentials = true;

const CompounderState = (props) => {
  const initialState = {
    error: null,
  };

  const [state, dispatch] = useReducer(CompounderReducer, initialState);

  const updateProfile = async (formData) => {
    console.log("updateProfile called...");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log(formData);
      const res = await axios.post(
        `/api/compounder/updateProfile`,
        formData,
        config
      );
      console.log(res);
      dispatch({ type: types.UPDATE_PROFILE_SUCCESS });
    } catch (error) {
      dispatch({
        type: types.UPDATE_PROFILE_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const updateSchedule = async (formData) => {
    console.log("updateScheule called...");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log(formData);
      const res = await axios.post(
        `/api/compounder/updateSchedule`,
        formData,
        config
      );
      console.log(res);
      dispatch({ type: types.UPDATE_SCHEDULE_SUCCESS });
    } catch (error) {
      dispatch({
        type: types.UPDATE_SCHEDULE_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const getAllMedicines = async () => {
    try {
      const res = await axios.get(`/api/compounder/allMedicines`);
      dispatch({ type: types.GET_ALL_MEDICINES_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_MEDICINES_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const clearError = () => {
    dispatch({ type: types.CLEAR_ERROR });
  };

  return (
    <CompounderContext.Provider
      value={{
        getAllMedicines,
        allMedicines: state.allMedicines,
        updateProfile,
        updateSchedule,
      }}
    >
      {props.children}
    </CompounderContext.Provider>
  );
};

export default CompounderState;
