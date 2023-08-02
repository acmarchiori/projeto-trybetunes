import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/albumList.css';

class AlbumList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      artistName: '',
      generatedList: [],
    };
  }

  componentDidMount() {
    this.fetchAlbum();
  }

  fetchAlbum = async () => {
    const { artist } = this.props;
    const list = await searchAlbumsAPI(artist);
    this.setState({ generatedList: list, artistName: artist }, () => {
      this.setState({ isLoading: false });
    });
  };

  list = () => {
    const { artistName, generatedList } = this.state;

    if (generatedList.length === 0) {
      return (
        <div className="no-album-found">
          <span className="error-icon" />
          <p>Nenhum álbum foi encontrado</p>
        </div>
      );
    }

    return (
      <>
        <p className="result-heading">
          Resultado de álbuns de:
          {' '}
          {artistName}
        </p>
        <div className="album-list">
          {generatedList.map((album) => (
            <div className="album-item" key={ album.collectionId }>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                {album.collectionName}
                <br />
                {artistName}
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {
          isLoading ? <Loading /> : this.list()
        }
      </div>
    );
  }
}
AlbumList.propTypes = {
  artist: PropTypes.string.isRequired,
};

export default AlbumList;
