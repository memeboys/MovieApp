import React from 'react';
import './SearchForm.css';
import { debounce } from 'lodash';
export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.debounces = debounce(this.props.searchMovie, 1000);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ value: e.target.value });
    let res = e.target.value.trim();
    this.debounces(res);
  }
  render() {
    return (
      <input
        className="header__search"
        value={this.state.value}
        placeholder="Type to search"
        onChange={this.onChange}
      ></input>
    );
  }
}
