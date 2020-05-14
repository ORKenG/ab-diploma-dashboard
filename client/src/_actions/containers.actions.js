
import { containersConstants } from '../_constants';
import { containersService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

function getContainers(siteID) {
    return dispatch => {
        dispatch(request());

        containersService.getContainers(siteID).then(
            containers => {
                const data = containers.containers;
                dispatch(success(data));
            },
            error => dispatch(failure(error.toString()))
        );
    };

    function request() { return { type: containersConstants.GETALL_CONTAINERS_REQUEST } }
    function success(containers) { return { type: containersConstants.GETALL_CONTAINERS_SUCCESS, payload: containers } }
    function failure(error) { return { type: containersConstants.GETALL_CONTAINERS_FAILURE, payload: error } }
}

function getContainerInfo(containerID) {
    return dispatch => {
        dispatch(request(containerID));

        containersService.getContainerInfo(containerID).then(
            containers => {
                const data = containers.containers[0];
                dispatch(success(data));
            },
            error => dispatch(failure(error.toString()))
        );
    };

    function request(containerID) { return { type: containersConstants.GET_CONTAINERINFO_REQUEST, id: containerID} }
    function success(data) { return { type: containersConstants.GET_CONTAINERINFO_SUCCESS, payload: { container: data, id: containerID} } }
    function failure(error) { return { type: containersConstants.GET_CONTAINERINFO_FAILURE, payload: error } }
}

export const containersActions = {
    getContainers,
    getContainerInfo
};
