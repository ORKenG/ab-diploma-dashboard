import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ShowDetailsModal = ({ siteInfo: { siteName, siteDescription, id, siteID, siteSecret, userId, createdDate }, ...props }) => {
    const date = new Date(createdDate).toDateString()

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Detailed site description
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <b>Sine name :</b> { siteName }
                </div>
                <div>
                    <b>Created Date :</b> { date }
                </div>
                <div>
                    <b>id :</b> { id }
                </div>
                <div>
                    <b>Site description :</b> { siteDescription }
                </div>
                <div>
                    <b>Site ID :</b> { siteID }
                </div>
                <div>
                    <b>Site secret :</b> { siteSecret }
                </div>
                <div>
                    <b>User ID :</b> { userId }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ShowDetailsModal;

