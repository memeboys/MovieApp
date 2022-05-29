import { Pagination } from 'antd';
import React from 'react';
import './Footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <Pagination
        className="footer"
        current={this.props.currentPage}
        total={this.props.totalPages}
        onChange={this.props.onPageChange}
      />
    );
  }
}
