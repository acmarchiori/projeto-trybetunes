import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/profile.css';

class Profile extends Component {
  state = {
    user: null,
    isLoading: true,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user, isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;

    return (
      <div data-testid="page-profile" className="page-profile">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="profile-background" />
            <img
              className="profile-image"
              src={ user.image }
              alt={ user.name }
              data-testid="profile-image"
            />
            <div className="profile-info">
              <p className="profile-name">
                Nome
                <br />
                <span>{user.name}</span>
              </p>
              <p className="profile-email">
                Email
                <br />
                <span>{user.email}</span>
              </p>
              <p className="profile-description">
                Descrição
                <br />
                <span>{user.description}</span>
              </p>
              <Link to="/profile/edit" className="link">Editar perfil</Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
