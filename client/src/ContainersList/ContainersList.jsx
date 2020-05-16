import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';

import { containersActions } from '../_actions';
import { sitesActions } from '../_actions';

import ContainersListItem from './ContainersListItem';

const ContainersList = ({getContainers, sites, containers: {containers, loading}, getSites, getContainerInfo}) => {
    const { siteName } = useParams();
    const containersList = containers.map((container, index) => { return (
        < ContainersListItem container={ container } getContainerInfo={ getContainerInfo } idx={ index + 1 } key={ container._id} />
                )})

    useEffect(() => {
        if (sites !== undefined && sites.items.length > 0) {
            const siteID = sites.items.find((item) => item.siteName === siteName).siteID;
            getContainers(siteID)
        } else {
            getSites()
        }

    }, [sites.items.length])

    if (loading) {
        return (
            <div>Containers are loading...</div>
        )
    }

    return (
        <div>
            <h3> Containers list of website: { siteName } </h3>
            <ul className="list-group">
                <li className="list-group-item">
                    <div className="row align-items-center">
                        <div className="col-1 d-flex justify-content-center">
                            <div> Selector Name </div>
                        </div>
                        <div className="col-3 d-flex justify-content-center">
                            <div> Target Selector </div>
                        </div>
                        <div className="col-3 d-flex justify-content-center">
                            <div> Description </div>
                        </div>
                        <div className="col-3 d-flex justify-content-center">
                            <div> Creation date</div>
                        </div>
                    </div>
                </li>
                { containersList }
            </ul>
        </div>
    )
}

const mapState = ({ sites, containers}) => {
    return {  sites, containers };
}

const actionCreators = {
    getContainers: containersActions.getContainers,
    getSites: sitesActions.getSites,
    getContainerInfo: containersActions.getContainerInfo
};

export default connect(mapState, actionCreators)(ContainersList);
