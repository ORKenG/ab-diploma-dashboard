
import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import ShowDetailsModal from '../ShowDetailsModal';

const SiteListItem = ({ siteInfo: { siteName, createdDate, deleting, siteDescription }, removeSite, siteInfo }) => {
    const message = deleting ? 'Deleting, wait..' : 'Delete item';
    const date = new Date(createdDate).toDateString()
    const [modalShow, setModalShow] = useState(false);

    return (
        <li className="list-group-item align-items-center d-flex">
            <div className="site-details col-8">
                <div className="row">
                    <div className="site-details__name col-4"> { siteName } </div>
                    <div className="site-details__created-date col-4"> { date } </div>
                    <div className="site-details__description col-4"> { siteDescription } </div>
                </div>
            </div>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                More details
            </Button>
            <button onClick={ removeSite } className="btn btn-outline-dark">
                {message}
            </button>
            <ShowDetailsModal
                show={modalShow}
                onHide={ () => setModalShow(false) }
                siteInfo={siteInfo}
            />
            <Link to={ `/containers/${siteName}` }>
                Open Containers
            </Link>
        </li>
    )
}
export default SiteListItem;
