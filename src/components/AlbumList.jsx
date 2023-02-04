import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
    console.log(artistName);

    if (generatedList.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <>
        <p>
          Resultado de álbuns de:
          {' '}
          {artistName}
        </p>

        {generatedList.map((album) => (
          <p key={ album.collectionId }>
            {album.collectionName}
            <Link
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            />
          </p>
        ))}

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
