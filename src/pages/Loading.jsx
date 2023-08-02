import React, { Component } from 'react';
import '../styles/loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="lds-default">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
