import { Spin } from 'antd';
import React from 'react';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import { fetchRatedMovies } from '../../api/apiService';
export default class RatedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
      currentPage: 1,
      totalPages: 0,
    };
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
    const movies = await fetchRatedMovies();
    this.setState({
      movies: movies.results,
      isLoading: false,
      currentPage: pageNumber,
      totalPages: movies.total_pages,
      error: null,
    });
  }

  render() {
    if (this.state.isLoading) {
      return <Spin size="large" />;
    }
    return (
      <>
        <main>
          <div className="content">
            <Movies movies={this.state.movies} userRates={this.props.userRates} />
          </div>
        </main>
        {this.state.movies.length === 0 ? null : (
          <Footer
            currentPage={this.state.currentPage}
            totalPages={this.state.totalPages}
            onPageChange={(pageNumber) => this.fetchMovies(pageNumber)}
          />
        )}
      </>
    );
  }
}
