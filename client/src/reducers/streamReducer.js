import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
      //[action.payload.id]: action.payload- String interpollation
      //It doesnot create an array
      //This syntax is used to assign a value to the given key
      return { ...state, [action.payload.id]: action.payload };

    case FETCH_STREAMS:
      //Using function mapKeys from lodash
      //mapKeys takes an array and returns an object
      return { ...state, ..._.mapKeys(action.payload, "id") };

    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case DELETE_STREAM:
      return _.omit(state, action.payload);
    // not using action.payload.id because payload is the id itself
    //Omit will create a new object with all properties from the state object without the element with the provided id

    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
};
