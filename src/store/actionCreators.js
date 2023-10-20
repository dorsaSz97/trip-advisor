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

export const setCategory = category => ({
  type: SET_CATEGORY,
  payload: category,
});
export const setLocation = location => ({
  type: SET_LOCATION,
  payload: location,
});
export const setCoords = (lat, lng) => ({
  type: SET_COORDS,
  payload: { lat, lng },
});
export const setBounds = (p1, p2, p3, p4) => ({
  type: SET_BOUNDS,
  payload: { p1, p2, p3, p4 },
});
export const setResults = results => ({
  type: SET_RESULTS,
  payload: [...results],
});
export const setSubmit = isSubmitted => ({
  type: SET_SUBMIT,
  payload: isSubmitted,
});
export const setSelected = index => ({
  type: SET_SELECTED,
  payload: index,
});
export const setMap = isMap => ({
  type: SET_MAP,
  payload: isMap,
});
