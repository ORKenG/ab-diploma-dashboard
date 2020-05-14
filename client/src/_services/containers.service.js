import config from 'config';
import { handleResponse } from './_helpers';
import { authHeader } from '../_helpers';

function getContainers(siteID) {
    const body = JSON.stringify({ siteID: siteID })

    const headers = authHeader();
    headers['Content-Type'] = 'application/json';

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: body
    };

    return fetch(`${config.apiUrl}/containers/`, requestOptions).then(handleResponse);
}

function getContainerInfo(containerID) {
    const headers = authHeader();

    const requestOptions = {
        method: 'GET',
        headers: headers,
    };

    return fetch(`${config.apiUrl}/containers/${containerID}`, requestOptions).then(handleResponse);
}

export const containersService = {
    getContainers,
    getContainerInfo
};
