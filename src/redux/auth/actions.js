import Http from "../../http-service";

// import {
//   LOGIN_USER,
//   LOGIN_USER_SUCCESS,
//   LOGOUT_USER,
//   REGISTER_USER,
//   REGISTER_USER_SUCCESS
// } from 'Constants/actionTypes';
import {LOGIN_PENDING, LOGIN_USER_SUCCESS, LOGOUT_USER} from "../../constants/actionTypes";

export const loginUser = (user, history) => {
  return dispatch => {
    dispatch({type: LOGIN_PENDING});
    // Http.post('http://80.87.199.171:3002/auth_login', user)
    //   .then(response => console.log(response))
    //   .catch(err => console.log(err))
    dispatch(loginUserSuccess(user, history));
  };
};

export const loginUserSuccess = (user, history) => {
  localStorage.setItem('user', 'ok');
  history.push('/app/dashboard');
  return dispatch => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    })
  }
};

export const logoutUser = () => {
  localStorage.removeItem('user');
  return {
    type: LOGOUT_USER,
  }
};

// export const registerUser = (user, history) => ({
//   type: REGISTER_USER,
//   payload: {user, history}
// })
// export const registerUserSuccess = (user) => ({
//   type: REGISTER_USER_SUCCESS,
//   payload: user
// })
