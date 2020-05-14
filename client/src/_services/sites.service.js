import config from 'config';
import { authHeader } from '../_helpers';
import { handleResponse } from './_helpers';


function getSites() {
    const username = JSON.parse(localStorage.getItem('user')).username;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/sites?userName=${username}`, requestOptions).then(handleResponse);
}

function removeSite (id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/sites/${id}`, requestOptions).then(handleResponse);
}

function addItem(item) {
    const data = JSON.stringify(item);

    const headers = authHeader();
    headers['Content-Type'] = 'application/json';

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    };

    return fetch(`${config.apiUrl}/sites/`, requestOptions).then(handleResponse);
}


export const sitesService = {
    getSites,
    removeSite,
    addItem
};
