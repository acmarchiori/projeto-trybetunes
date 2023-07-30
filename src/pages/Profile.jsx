import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

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
      <div data-testid="page-profile">
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <div>
            <Header />
            <h2>Perfil</h2>
            <p>
              Nome:
              {' '}
              {user.name}
            </p>
            <p />
            <p>
              Email:
              {' '}
              {user.email}
            </p>
            <p>
              Descrição:
              {' '}
              {user.description}
            </p>
            <img
              src={ user.image }
              alt={ user.name }
              data-testid="profile-image"
            />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
