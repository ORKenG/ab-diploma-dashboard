import React from 'react';
import SiteListItem from './SiteListItem';
import { connect } from 'react-redux';
import { sitesActions } from '../_actions';

import './siteList.scss';

const SitesList = ({ sites, removeSite }) => {
    if (sites.loading) {
        return (
            <p>Sites are loading...</p>
        )
    }

    if (sites.error) {
        return (
            <p>Error occurred...</p>
        )
    }

    return (
        <ul className="sites-list list-group">
            { sites.items.map((item) => {
                return (
                    <SiteListItem siteInfo={item} key={item.siteID} removeSite={() => removeSite(item.id)} />
                )
            })}
        </ul>
    )
}

function mapState({ sites }) {
    return { sites };
}

const actionCreators = {
    removeSite: sitesActions.deleteItem
}

export default connect(mapState, actionCreators)(SitesList);
