import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    isLoading: true,
    result: '',
  };

  componentDidMount() {
    this.resultGetUser();
  }

  resultGetUser = async () => {
    const { name } = await getUser();
    this.setState({
      isLoading: false,
      result: name,
    });
    return name;
  };

  render() {
    const { isLoading, result } = this.state;
    return (

      <header data-testid="header-component">
        {
          isLoading ? <Loading /> : (
            <h2 data-testid="header-user-name">
              { result }
            </h2>
          )
        }
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <br />
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <br />
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
