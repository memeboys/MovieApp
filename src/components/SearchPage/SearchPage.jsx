import { Spin } from 'antd';
import { debounce } from 'lodash';
import React from 'react';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SearchForm from '../SearchForm/SearchForm';
import ErrorIndicator from '../shared/ErrorIndicator';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
      currentPage: 1,
      totalPages: 0,
      searchQuery: '',
    };
    this.baseURL = 'https://api.themoviedb.org/3';
    this.apiKey = 'ca57099477a2c0925544b12050bcc9d6';
    this.searchMovies = debounce(this.searchMovies, 1000);
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
  }

  async componentDidMount() {
    await this.fetchMovies(this.state.currentPage, this.state.searchQuery);
  }

  async handleSearchQueryChange(searchQuery) {
    this.setState({ searchQuery: searchQuery });
    await this.searchMovies(searchQuery);
  }

  async searchMovies(searchQuery) {
    await this.fetchMovies(1, searchQuery);
  }

  async fetchMovies(pageNumber, searchQuery) {
    const query = searchQuery === '' ? 'return' : encodeURIComponent(searchQuery);
    this.setState({ isLoading: true });
    const response = await fetch(
      `${this.baseURL}/search/movie?api_key=${this.apiKey}&query=${query}&page=${pageNumber}`
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
      this.setState({ error: 'No movie found' });
    }
    return (
      <>
        <SearchForm searchQuery={this.state.searchQuery} onSearchQueryChange={this.handleSearchQueryChange} />
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
