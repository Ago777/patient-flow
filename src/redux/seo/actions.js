import Http from "../../http-service";
import {
    GET_SEO_PENDING,
    GET_SEO_SUCCESS,
    GET_SEO_FAILED,
} from 'Constants/actionTypes';

export const getSeoRankings = () => {
    return dispatch => {
        dispatch({type: GET_SEO_PENDING});

        Http.get(`/seoranks`)
          .then(response => response.data ? dispatch(getSeoSuccess(response.data)) : dispatch(getSeoFailed('No SeoRankings')))
          .catch(err => dispatch(getSeoFailed('Can\'t Find Rankings, Please Sign In Again')))
    }
};

export const getSeoSuccess = (data) => {
    return {
        type: GET_SEO_SUCCESS,
        payload: data
    }
};

export const getSeoFailed = (error) => {
    return {
        type: GET_SEO_FAILED,
        payload: error
    }
};

