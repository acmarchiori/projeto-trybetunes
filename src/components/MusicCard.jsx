import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    checked: false,
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.getFavorite();
    this.funcChecked();
  }

  funcChecked = () => {
    const { isFavorite } = this.props;
    if (isFavorite) {
      this.setState({ checked: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, type } = target;
    const newValue = (type === 'checkbox' ? target.checked : target.value);
    this.setState(
      {
        [name]: newValue,
      },
      this.fetchFavorite,
      this.removeFavorite,
    );
  };

  getFavorite = async () => {
    const { favoriteSongs } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      const favList = await getFavoriteSongs();
      this.setState({
        isLoading: false,
        favoriteSongs: favList,
      });
      return favoriteSongs;
    });
  };

  removeFavorite = async () => {
    const { musics } = this.props;
    console.log('entrei');
    this.setState({
      isLoading: true,
    }, async () => {
      await removeSong(musics);
      this.setState({
        isLoading: false,
      });
    });
  };

  fetchFavorite = async () => {
    const { musics } = this.props;
    // console.log(musics);
    this.setState({
      isLoading: true,
    }, async () => {
      await addSong(musics);
      this.setState({
        isLoading: false,
      });
    });
  };

  // handleFavorite = async () => {
  //   const { musics, isFavorite } = this.props;
  //   if (isFavorite) {
  //     this.state({
  //       isLoading: true,
  //     }, async () => {
  //       await removeSong(musics);
  //       this.setState({
  //         isLoading: false,
  //       });
  //     });
  //   } else {
  //     this.setState({
  //       isLoading: true,
  //     }, async () => {
  //       await addSong(musics);
  //       this.setState({
  //         isLoading: false,
  //       });
  //     });
  //   }
  // };

  list = () => {
    const { checked } = this.state;
    const { musics } = this.props;
    return (
      <div>
        <li>
          <p>
            { musics.trackNumber }
            {' '}
            -
            {' '}
            { musics.trackName }
          </p>
          <audio
            data-testid="audio-component"
            src={ musics.previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorite">
            Favorita
            <input
              data-testid={ `checkbox-music-${musics.trackId}` }
              type="checkbox"
              name="checked"
              id="favorite"
              checked={ checked }
              onChange={ this.handleChange }
            />
          </label>
        </li>
      </div>
    );
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div>
        <ul>
          { this.list() }
        </ul>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.obj,
}.isrequired;

export default MusicCard;
