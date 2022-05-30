import { Spin } from 'antd';
import React from 'react';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import ErrorIndicator from '../shared/ErrorIndicator';

export default class RatedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
      currentPage: 1,
      totalPages: 0,
    };
    this.baseURL = 'https://api.themoviedb.org/3';
    this.apiKey = 'ca57099477a2c0925544b12050bcc9d6';
    this.guestSessionId = this.props.guestSessionId;
  }
  async componentDidCatch(errorString, errorInfo) {
    this.setState({ error: errorString });
    console.log(errorInfo);
  }
  async componentDidMount() {
    await this.fetchMovies(this.state.currentPage);
  }

  async fetchMovies(pageNumber) {
    this.setState({ isLoading: true });
    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${this.guestSessionId}/rated/movies?api_key=${this.apiKey}&sort_by=created_at.asc`
    );
    if (!response.ok) {
      throw new Error(`Error with Status code: ${response.status}`);
    }
    const movies = await response.json();
    this.setState({
      movies: movies.results,
      isLoading: false,
      currentPage: pageNumber,
      totalPages: movies.total_pages,
    });
  }

  render() {
    if (this.state.isLoading) {
      return <Spin size="large" />;
    }
    if (this.state.movies.length === 0) {
      this.setState({ error: 'No movie rated' });
    }
    return (
      <>
        <main>
          {this.state.error ? <ErrorIndicator description={this.state.error} /> : null}
          <div className="content">
            <Movies movies={this.state.movies} userRates={this.props.userRates} onMovieRate={this.props.onMovieRate} />
          </div>
        </main>
        <Footer
          currentPage={this.state.currentPage}
          totalPages={this.state.totalPages}
          onPageChange={(pageNumber) => this.fetchMovies(pageNumber, this.state.searchQuery)}
        />
      </>
    );
  }
}
