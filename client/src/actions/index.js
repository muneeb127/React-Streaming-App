import streams from "../apis/streams";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "./types";
import history from "../history";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

// export const createStream = formValues => {
//   //Defining an ascynchronous action creator
//   //Whenever we define an asynchronous action creator, we          make use of redux-thunk
//   return dispatch => {};
// };

//OR

//Redux thunk automatically calls thunk
//getState function allows us to reach into the redux store and pull out some information
export const createStream = formValues => async (dispatch, getState) => {
  //Fetching userId from the state
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });

  //Do some programmit navigation
  //get the user back to the root route once the stream is created
  history.push("/");

  dispatch({
    type: CREATE_STREAM,
    payload: response.data
  });
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams");

  dispatch({
    type: FETCH_STREAMS,
    payload: response.data
  });
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({
    type: FETCH_STREAM,
    payload: response.data
  });
};

export const editStream = (id, formValues) => async dispatch => {
  // patch only updates the passed in values but it doesnot over write or delete any other value
  const response = await streams.patch(`streams/${id}`, formValues);
  dispatch({
    type: EDIT_STREAM,
    payload: response.data
  });
  history.push("/");
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`streams/${id}`);
  dispatch({
    type: DELETE_STREAM,
    payload: id
  });
};
