
import React from 'react';

const SiteListItem = ({ siteInfo: { siteName, createdDate, deleting, siteDescription }, removeSite }) => {
    const message = deleting ? 'Deleting, wait..' : 'Delete item';

    return (
        <li className="list-group-item">
            <div className="site-details">
                <div className="site-details__name"> { siteName } </div>
                <div className="site-details__created-date"> { createdDate } </div>
                <div className="site-details__description"> { siteDescription } </div>
            </div>
            <button onClick={ removeSite } className="btn btn-outline-dark">
                {message}
            </button>
        </li>
    )
}
export default SiteListItem;
