import Http from "../../http-service";
import {
    LOGIN_PENDING,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    LOGIN_USER_FAILED,
    RESET_ERROR
} from "../../constants/actionTypes";

export const loginUser = (user, history) => {
    return dispatch => {
        dispatch({type: LOGIN_PENDING});
        Http.auth('/auth_login', user)
            .then(response => dispatch(loginUserSuccess(response, history)))
            .catch(res => dispatch({type: LOGIN_USER_FAILED, payload: 'Wrong Email or Password'}))
    };
};

export const loginUserSuccess = (response, history) => {
    const user = response['data']
    const userToken = user['jwt']['token'];
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userToken', userToken);
    return dispatch => {
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: user
        });
        history.push('/app/dashboard');
    }
};

export const resetError = () => {
    return {
        type: RESET_ERROR,
        payload: null
    }
}

export const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    return {
        type: LOGOUT_USER,
    }
};
