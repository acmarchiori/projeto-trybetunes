import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../styles/header.css'; // Importando o arquivo de estilos do Header

class Header extends Component {
  state = {
    isLoading: true,
    name: '',
    image: '',
  };

  componentDidMount() {
    this.resultGetUser();
  }

  resultGetUser = async () => {
    const { name, image } = await getUser();
    this.setState({
      isLoading: false,
      name,
      image,
    });
    return name;
  };

  render() {
    const { isLoading, name, image } = this.state;
    return (
      <header data-testid="header-component" className="header-component">
        <div className="header-logo" />
        <Link
          to="/search"
          data-testid="link-to-search"
          className="header-link search"
        >
          Pesquisar
        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
          className="header-link favorites"
        >
          Favoritas

        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
          className="header-link profile"
        >
          Perfil

        </Link>
        {
          isLoading ? <Loading /> : (
            <div className="header-footer">
              <img src={ image } alt={ name } className="header-user-photo" />
              <p data-testid="header-user-name" className="header-user-name">{name}</p>
            </div>
          )
        }
      </header>
    );
  }
}

export default Header;
