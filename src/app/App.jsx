import React from 'react';
import { Spin } from 'antd';
import Movies from '../Movies/Movies';
import './App.css';
import '../Movies/Movies.css';
import '../Movie/Movie.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await fetch(
      'https://api.themoviedb.org/3/trending/movie/week?api_key=ca57099477a2c0925544b12050bcc9d6'
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      this.setState({ data: data.results, isLoading: false });
    } else {
      console.log('error', response.status);
    }
  }
  render() {
    const { data, isLoading } = this.state;
    return (
      <div className="container">
        <div className="content">{isLoading ? <Spin size="large" /> : <Movies movies={data} />}</div>
      </div>
    );
  }
}
