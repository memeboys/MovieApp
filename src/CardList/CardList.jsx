import React from 'react';
import Card from '../Card/Card';
import './CardList.css';

export default class CardList extends React.Component {
  render() {
    return (
      <div className="movies">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}
