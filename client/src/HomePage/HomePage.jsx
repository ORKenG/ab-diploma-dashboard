import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { sitesActions } from '../_actions';

import SitesList from '../SitesList';
import AddItem from '../AddItem';
import DownloadLibraryButton from '../DownloadLibraryButton';
class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
        this.props.getSites();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in</p>
                <p>
                    <Link to="/login">Logout</Link>
                </p>

                <div>
                    <SitesList />
                    <AddItem />
                    <DownloadLibraryButton />
                </div>
            </div>
        );
    }
}

function mapState({ users, authentication }) {
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    getSites: sitesActions.getSites,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };


