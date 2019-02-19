import Http from "../../http-service";
import {
    GET_LISTINGS_PENDING,
    GET_LISTINGS_SUCCESS,
    GET_LISTINGS_FAILED,
} from 'Constants/actionTypes';

export const getListings = () => {
    const locationId = JSON.parse(localStorage.getItem('user'))['locationIds'];
    return dispatch => {
        dispatch({type: GET_LISTINGS_PENDING});

        Http.get(`/listings?locationIds=${locationId}`)
          .then(response => response.data ? dispatch(getListingsSuccess(response.data)) : dispatch(getListingsFailed('No Listings')))
          .catch(err => dispatch(getListingsFailed('Can\'t Find Listings, Please Sign In Again')))
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

