import * as types from "../types";

const GlobalReducer = (state, action) => {
  if (action.type === types.SET_DOCTOR_SCHEDULE_SUCCESS) {
    return {
      ...state,
      doctorSchedule: action.payload,
    };
  } else if (action.type === types.SET_ALERT) {
    return {
      ...state,
      alert: action.payload,
    };
  } else if (action.type === types.CLEAR_ALERT) {
    return {
      ...state,
      alert: null,
    };
  } else if (action.type === types.SET_LOADING) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === types.CLEAR_LOADING) {
    return {
      ...state,
      loading: false,
    };
  } else if (action.type === types.SET_COMPOUNDER_SCHEDULE_SUCCESS) {
    return {
      ...state,
      compounderSchedule: action.payload,
    };
  } else if (action.type === types.SET_AVAILABLIITY_SUCCESS) {
    return { ...state, available: action.payload };
  } else if (action.type === types.SET_WIDTH) {
    return {
      ...state,
      width: window.innerWidth,
    };
  } else if (action.type === types.SET_HEIGHT) {
    return {
      ...state,
      height: window.innerHeight,
    };
  } else if (action.type === types.SET_IS_MOBILE) {
    return {
      ...state,
      isMobile: true,
    };
  } else if (action.type === types.SET_LOCATION) {
    return {
      ...state,
      latitude: action.payload.latitude,
      longitude: action.payload.longitude,
    };
  } else if (action.type === types.SET_IS_NOT_MOBILE) {
    return {
      ...state,
      isMobile: false,
    };
  }
};

export default GlobalReducer;
