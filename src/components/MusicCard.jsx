import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { addSong } from '../services/favoriteSongsAPI';
// import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    // checked: false,
    // trackId: '',
  };

  // componentDidMount() {
  //   this.fetchMusic();
  //   this.fetchFavorite();
  // }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const newValue = (type === 'checkbox' ? target.checked : target.value);
    this.setState({
      [name]: newValue,
    });
  };

  // fetchFavorite = async () => {
  //   const { trackId } = this.state;
  //   const favorite = await addSong(trackId);
  //   return favorite;
  // };

  list = () => {
    const { musics } = this.props;
    return (
      <div>
        <li>
          <p>{ musics.trackName }</p>
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
          <label htmlFor="favorita">
            Favorita
            <input
              data-testid={ `checkbox-music-${musics.trackId}` }
              type="checkbox"
              name="favorita"
              id={ musics }
              // checked={ checked }
              onChange={ this.handleChange }
            />
          </label>
        </li>
      </div>
    );
  };

  render() {
    return (
      <div>
        <ol>
          {
            this.list()
          }
        </ol>
      </div>
    );
  }
}

MusicCard.propTypes = {
  id: PropTypes.string,
}.isrequired;

export default MusicCard;
