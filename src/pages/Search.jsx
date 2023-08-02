import React, { Component } from 'react';
import Header from '../components/Header';
import AlbumList from '../components/AlbumList';
import '../styles/search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      buttonEnable: true,
      search: '',
      visibleList: false,
    };
  }

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

  callList = async () => {
    this.setState({ visibleList: true }, () => this.setState({ search: '' }));
  };

  render() {
    const {
      buttonEnable,
      search,
      visibleList,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form className="searchBar">
          <input
            type="text"
            name="search"
            id="search"
            data-testid="search-artist-input"
            placeholder="DIGITE A SUA PESQUISA"
            required
            value={ search }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonEnable }
            onClick={ this.callList }
          >
            PROCURAR
          </button>
        </form>
        <div>
          {
            visibleList ? <AlbumList artist={ search } /> : <p />
          }
        </div>
      </div>
    );
  }
}

export default Search;
