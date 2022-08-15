import {
  SET_CATEGORY,
  SET_LOCATION,
  SET_RESULTS,
  SET_COORDS,
  SET_BOUNDS,
} from './actionTypes';

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_CATEGORY:
      return { ...state, category: payload };

    case SET_LOCATION:
      return {
        ...state,
        searchedLocation: payload,
      };

    case SET_COORDS:
      return {
        ...state,
        searchedCoords: {
          lat: payload.lat,
          lng: payload.lng,
        },
      };

    case SET_BOUNDS:
      return {
        ...state,
        resultsBounds: {
          p1: payload.p1,
          p2: payload.p2,
          p3: payload.p3,
          p4: payload.p4,
        },
      };

    case SET_RESULTS:
      return {
        ...state,
        results: payload,
      };

    default:
      return state;
  }
};

export default appReducer;
