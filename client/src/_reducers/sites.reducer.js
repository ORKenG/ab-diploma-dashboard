
import { sitesConstants } from '../_constants';

export function sites(state, action) {
    if (state === undefined) {
        return {
            items: [],
            loading: true,
            error: null,
        }
    }

    switch (action.type) {

        case sitesConstants.GET_SITES_REQUEST:
            return {
                items: [],
                loading: true,
                error: null
            };

        case sitesConstants.GET_SITES_SUCCESS:
            return {
                items: action.payload,
                loading: false,
                error: null
            };

        case sitesConstants.GET_SITES_FAILURE:
            return {
                items: [],
                loading: false,
                error: action.payload
            };

        case sitesConstants.DELETE_SITE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.id
                        ? { ...item, deleting: true }
                        : item
                )
            };

        case sitesConstants.DELETE_SITE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(item => item.id !== action.id)
            };

        case sitesConstants.DELETE_SITE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to site
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...itemCopy } = item;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...itemCopy, deleteError: action.error };
                    }

                    return item;
                })
            };

        case sitesConstants.ADD_SITE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                isSaving: true
            };

        case sitesConstants.ADD_SITE_SUCCESS:
            // remove deleted user from state
            return {
                ...state,
                isSaving: false
            };

        case sitesConstants.ADD_SITE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to site
            return {
                ...state,
                saveError: action.error,
                isSaving: false
            };

        default:
            return state;
    }
}
