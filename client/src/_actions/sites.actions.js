
import { sitesConstants } from '../_constants';
import { sitesService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

function getSites() {
    return dispatch => {
        dispatch(request());

        sitesService.getSites().then(
            items => dispatch(success(items)),
            error => dispatch(failure(error.toString()))
        );
    };

    function request() { return { type: sitesConstants.GET_SITES_REQUEST } }
    function success(items) { return { type: sitesConstants.GET_SITES_SUCCESS, payload: items } }
    function failure(error) { return { type: sitesConstants.GET_SITES_FAILURE, payload: error } }
}

function deleteItem(id) {
    return dispatch => {
        dispatch(request(id));

        sitesService.removeSite(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: sitesConstants.DELETE_SITE_REQUEST, id } }
    function success(id) { return { type: sitesConstants.DELETE_SITE_SUCCESS, id } }
    function failure(id, error) { return { type: sitesConstants.DELETE_SITE_FAILURE, id, error } }
}

const addItem = (item) => {
    return dispatch => {
        dispatch(request(item));

        sitesService.addItem(item)
            .then(
                item => {
                    dispatch(success());
                    dispatch(alertActions.success('Item Added'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: sitesConstants.ADD_SITE_REQUEST, item } }
    function success(user) { return { type: sitesConstants.ADD_SITE_SUCCESS, item } }
    function failure(error) { return { type: sitesConstants.ADD_SITE_FAILURE, error } }
}


export const sitesActions = {
    getSites,
    deleteItem,
    addItem
};
