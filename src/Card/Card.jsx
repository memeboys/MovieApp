import React from 'react';
import './Card.css';

export default class Card extends React.Component {
  render() {
    return (
      <div className="movie__card movie-card">
        <img src="https://a4.pbase.com/o4/70/490670/1/149002119.c0eKPMq4.gaymusclewrestlers.jpg"></img>
        <div className="movie-card__info">
          <div className="movie-card__header">
            <h2 className="movie-card__title">Самый уёбищный фильм</h2>
          </div>
          <span className="movie-card__release">March 5, 2020</span>
          <div className="movie-card__body-wrapper">
            <span className="movie-card__description">Готовьтесь хуево провести время за вёрсткой</span>
          </div>
        </div>
      </div>
    );
  }
}
