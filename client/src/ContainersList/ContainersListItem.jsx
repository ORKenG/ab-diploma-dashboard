import React, {useState} from 'react';
import ContainersStatistic from '../ContainersStatistic'
import Collapse from 'react-bootstrap/Collapse';

const ContainersListItem = ({ container : {id, selector, targetSelector, description, createdDate, containerStatistics }, getContainerInfo }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);

        if (!containerStatistics) {
            getContainerInfo(id)
        }
    }

    const date = new Date(createdDate);

    return (
        <li className="list-group-item">
            <div className="row align-items-center">
                <div className="col d-flex justify-content-center">
                    <div >
                        { selector }
                    </div>
                </div>
                <div className="col-3 d-flex justify-content-center">
                    <div>
                        { targetSelector }
                    </div>
                </div>
                <div className="col-3 d-flex justify-content-center">
                    <div>
                        { description }
                    </div>
                </div>
                <div className="col-3 d-flex justify-content-center">
                    <div>
                        { date.toDateString() }
                    </div>
                </div>
                <div className="col-2 d-flex justify-content-center">
                    <button className="btn btn-primary" type="button" onClick={ handleClick } aria-controls={`${selector}-collapse-content`} aria-expanded={open}>
                        View Statistics
                    </button>
                </div>
            </div>

            <Collapse in={open}>
                <div id={`${selector}-collapse-content` }>
                    < ContainersStatistic containerStatistics={ containerStatistics }/>
                </div>
            </Collapse>
        </li>
)}


export default ContainersListItem;
