
import React from 'react';
import { Link } from 'react-router-dom';

const SiteListItem = ({ siteInfo: { siteName, createdDate, deleting, siteDescription }, removeSite }) => {
    const message = deleting ? 'Deleting, wait..' : 'Delete item';
    const date = new Date(createdDate).toDateString()

    return (
        <li className="list-group-item">
            <div className="site-details col-8">
                <div className="row">
                    <div className="site-details__name col-4"> { siteName } </div>
                    <div className="site-details__created-date col-4"> { date } </div>
                    <div className="site-details__description col-4"> { siteDescription } </div>
                </div>
            </div>
            <button onClick={ removeSite } className="btn btn-outline-dark">
                {message}
            </button>
            <Link to={ `/containers/${siteName}` }>
                Open Containers
            </Link>
        </li>
    )
}
export default SiteListItem;
