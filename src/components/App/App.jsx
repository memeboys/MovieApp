import { Spin } from 'antd';
import React from 'react';
import { Offline, Online } from 'react-detect-offline';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import WarningIndicator from '../WarningIndicator/WarningIndicator';

import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
      error: false,
      currentPage: 1,
    };
    this.handlerSearchMovie = this.handlerSearchMovie.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }
  async componentDidMount() {
    await this.presentTrendingMovies();
  }
  async presentTrendingMovies() {
    try {
      const movie = await this.fetchTrendingMovies();
      this.setState({ movies: movie.results, isLoading: false, value: 'return' });
    } catch (error) {
      this.setState({ error: true, errorDescription: error.message });
      console.error(error);
    }
  }

  async fetchTrendingMovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ca57099477a2c0925544b12050bcc9d6&query=return&page=${this.state.currentPage}`
    );
    if (!response.ok) {
      const messageError = 'Error with Status code: ' + response.status;
      throw new Error(messageError);
    }
    return response.json();
  }
  async handlerSearchMovie(updateValue) {
    this.setState({ isLoading: true, currentPage: 1 });
    const query = updateValue === '' ? 'return' : encodeURIComponent(updateValue);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=ca57099477a2c0925544b12050bcc9d6&query=${query}`
      );
      if (!response.ok) {
        const messageError = 'Error with Status code: ' + response.status;
        throw new Error(messageError);
      }
      const movies = await response.json();
      this.setState({ movies: movies.results, isLoading: false, value: query });
    } catch (error) {
      this.setState({ error: true, errorDescription: error.message });
      console.error(error);
    }
  }
  async nextPage(pageNumber, value) {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=ca57099477a2c0925544b12050bcc9d6&query=${value}&page=${pageNumber}`
      );
      if (!response.ok) {
        const messageError = 'Error with Status code: ' + response.status;
        throw new Error(messageError);
      }
      const movies = await response.json();
      this.setState({ movies: movies.results, isLoading: false, currentPage: pageNumber });
    } catch (error) {
      this.setState({ error: true, errorDescription: error.message });
      console.error(error);
    }
  }
  render() {
    console.log('render');
    const { movies, error, errorDescription, isLoading, value, currentPage } = this.state;
    return (
      <div className="container">
        <Online>
          {error ? <ErrorIndicator description={errorDescription} /> : null}
          <Header searchMovie={this.handlerSearchMovie} />
          <div className="content">{isLoading ? <Spin size="large" /> : <Movies movies={movies} />}</div>
          <Footer paginationPage={this.nextPage} value={value} page={currentPage} />
        </Online>
        <Offline>
          <WarningIndicator />
          <div className="content">{isLoading ? <Spin size="large" /> : <Movies movies={movies} />}</div>
        </Offline>
      </div>
    );
  }
}
