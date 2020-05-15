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
                    <b>Site ID :</b> { siteID }
                </div>
                <div>
                    <b>Site secret :</b> { siteSecret }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ShowDetailsModal;

