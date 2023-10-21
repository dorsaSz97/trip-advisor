const initialAppState = {
  // changing ui, reseting results, deselect result
  category: 'catering',

  // change results, deselect result
  searchedLocation: '',

  // move the center of the map to the center of the searched city
  searchedCoords: {},

  // get the results from the api, set map's bounds
  resultsBounds: {},

  // show on the map, show in the list
  results: [],

  // move in between views (1 page!)
  isSubmitted: false,

  // selected result's index in the array
  selectedResult: null,

  // toggle map/result view in mobile size
  isMap: true,
};

export default initialAppState;
