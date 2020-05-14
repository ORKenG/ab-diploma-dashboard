import React, {useState} from 'react';
import { connect } from 'react-redux';
import { sitesActions } from '../_actions';

const AddItem = ({ addSite, isSaving, saveError }) => {
    const [siteName, setSiteName] = useState('');
    const [siteDescr, setSiteDescr] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            siteName: siteName,
            siteDescription: siteDescr
        }

        addSite(newItem)
        clearForm()
    }

    const clearForm = () => {
        setSiteName('');
        setSiteDescr('');
    }

    const onSiteNameChange = (e) => {
        const value = e.target.value;
        setSiteName(value)
    }

    const onSiteDescrChange = (e) => {
        const value = e.target.value;
        setSiteDescr(value)
    }

    if (isSaving) {
        return (
            <div>Site is saving ...</div>
        )
    }

    if (saveError) {
        return (
            <p>Error occurred...</p>
        )
    }
    return (
        <div className="card mt-3">
            <div className="card-body">
                <div className="add-item-form">
                    <p>Add new site Form</p>
                    <form action="sumbit" onSubmit={ (e) => handleSubmit(e) }>
                        <div className="form-group">
                            <label htmlFor="siteName">
                                Site Name
                            </label>
                            <input type="text" className="form-control" value={ siteName }  id="siteName" placeholder="Enter site name"  onChange={ (e) => onSiteNameChange(e) } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="siteDescr">
                                Site description
                            </label>
                            <input type="text" className="form-control" value={ siteDescr }  id="siteDescr" placeholder="Enter site description"  onChange={ (e) => onSiteDescrChange(e) } />
                        </div>
                        <button className="btn btn-primary" type="submit">Save site</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

function mapState({ sites: { isSaving, saveError } }) {
    return { isSaving, saveError };
}

const actionCreators = {
    addSite: sitesActions.addItem
}
export default connect(mapState, actionCreators)(AddItem);
