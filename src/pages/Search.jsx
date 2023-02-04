import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    buttonEnable: true,
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.btnDisable);
  };

  btnDisable = () => {
    const { search } = this.state;
    const minCharacter = 2;
    if (search.length >= minCharacter) {
      this.setState({ buttonEnable: false });
    }
  };

  render() {
    const {
      buttonEnable,
      search,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="search"
            id="search"
            data-testid="search-artist-input"
            required
            value={ search }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonEnable }
            // onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
