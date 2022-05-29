import React from 'react';
import './SearchForm.css';
export default class SearchForm extends React.Component {
  render() {
    return (
      <input
        className="header__search"
        value={this.props.searchQuery}
        placeholder="Type to search"
        onChange={(e) => this.props.onSearchQueryChange(e.target.value.trim())}
      ></input>
    );
  }
}
