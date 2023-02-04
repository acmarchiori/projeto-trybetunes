import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const INITIAL_STATE = {
  nameInput: '',
  buttonEnable: true,
  isLoading: false,
};

class Login extends Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.btnDisable);
  };

  handleClick = () => {
    const { history } = this.props;
    const { nameInput } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      await createUser({ name: nameInput });
      history.push('/search');
    });
  };

  btnDisable = () => {
    const { nameInput } = this.state;
    const minCharacter = 3;
    if (nameInput.length >= minCharacter) {
      this.setState({ buttonEnable: false });
    }
  };

  render() {
    const {
      nameInput,
      buttonEnable,
      isLoading,
    } = this.state;

    return (
      <div data-testid="page-login">
        {
          isLoading ? <Loading /> : (
            <form>
              <input
                data-testid="login-name-input"
                type="text"
                name="nameInput"
                id="nameInput"
                required
                value={ nameInput }
                onChange={ this.handleChange }
              />
              <button
                data-testid="login-submit-button"
                disabled={ buttonEnable }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>
          )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string,
  }),
}.isrequired;

export default Login;
