import {
  SET_CATEGORY,
  SET_LOCATION,
  SET_RESULTS,
  SET_COORDS,
  SET_BOUNDS,
  SET_SUBMIT,
  SET_SELECTED,
  SET_MAP,
} from './actionTypes';

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_CATEGORY:
      return { ...state, category: payload, results: [], selectedResult: 0 };

    case SET_LOCATION:
      return {
        ...state,
        searchedLocation: payload,
        results: [],
        selectedResult: 0,
      };

    case SET_COORDS:
      return {
        ...state,
        searchedCoords: {
          lat: Number(payload.lat),
          lng: Number(payload.lng),
        },
      };

    case SET_BOUNDS:
      return {
        ...state,
        resultsBounds: {
          p1: Number(payload.p1),
          p2: Number(payload.p2),
          p3: Number(payload.p3),
          p4: Number(payload.p4),
        },
      };

    case SET_RESULTS:
      return {
        ...state,
        results: payload,
      };

    case SET_SUBMIT:
      return {
        ...state,
        isSubmitted: payload,
        selectedResult: 0,
      };

    case SET_SELECTED:
      return {
        ...state,
        selectedResult: payload,
      };

    case SET_MAP:
      return {
        ...state,
        isMap: payload,
      };

    default:
      return state;
  }
};

export default appReducer;
