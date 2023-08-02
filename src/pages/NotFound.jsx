import React, { Component } from 'react';
import '../styles/notFound.css';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className="notFound">
        <h1>Ops!</h1>
        <h2>A página que você está procurando não foi encontrada</h2>
      </div>
    );
  }
}

export default NotFound;
