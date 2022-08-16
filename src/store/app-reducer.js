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
      return { ...state, category: payload, results: [] };

    case SET_LOCATION:
      return {
        ...state,
        searchedLocation: payload,
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

    default:
      return state;
  }
};

export default appReducer;
