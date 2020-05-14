
import { containersConstants } from '../_constants';

export function containers(state, action) {
    if (state === undefined) {
        return {
            containers: [],
            loading: true,
            error: null,
        }
    }

    switch (action.type) {

        case containersConstants.GETALL_CONTAINERS_REQUEST:
            return {
                containers: [],
                loading: true,
                error: null
            };

        case containersConstants.GETALL_CONTAINERS_SUCCESS:
            return {
                containers: action.payload,
                loading: false,
                error: null
            };

        case containersConstants.GETALL_CONTAINERS_FAILURE:
            return {
                containers: [],
                loading: false,
                error: action.payload
            };

        case containersConstants.GET_CONTAINERINFO_REQUEST:
            return {
                ...state,
                containers: state.containers.map(item =>
                    item.id === action.id
                        ? { ...item, loadingStatistic: true }
                        : item
                )
            };

        case containersConstants.GET_CONTAINERINFO_SUCCESS:
            return {
                ...state,
                containers: state.containers.map(item =>
                    item.id === action.payload.id
                        ? {
                            ...item, loadingStatistic: false,
                            containerEvents: action.payload.container.containerEvents,
                            containerStatistics: action.payload.container.containerStatistics[0]
                        }
                        : item
                )
            };

        case containersConstants.GET_CONTAINERINFO_FAILURE:
            return {
                ...state,
                containers: state.containers.map(item =>
                    item.id === action.id
                        ? { ...item, loadingStatistic: false, error: action.payload }
                        : item
                )

            };

        default:
            return state;
    }
}
