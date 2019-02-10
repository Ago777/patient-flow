import Http from "../../http-service";
import {
    GET_LISTINGS_PENDING,
    GET_LISTINGS_SUCCESS,
    GET_LISTINGS_FAILED,
} from 'Constants/actionTypes';

export const getListings = () => {
    return dispatch => {
        dispatch({type: GET_LISTINGS_PENDING});
        Http.get("http://80.87.199.171:3002/listings")
          .then(response => response.data ? dispatch(getListingsSuccess(response.data)) : dispatch(getListingsFailed('No Listings')))
          .catch(err => dispatch(getListingsFailed('Can\'t find Listings, Please try later')))
    }
};

export const getListingsSuccess = (data) => {
    return {
        type: GET_LISTINGS_SUCCESS,
        payload: data
    }
};

export const getListingsFailed = (error) => {
    return {
        type: GET_LISTINGS_FAILED,
        payload: error
    }
};

