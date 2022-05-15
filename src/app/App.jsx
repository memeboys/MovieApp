import React from 'react';
import CardList from '../CardList/CardList';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <CardList />
      </div>
    );
  }
}
