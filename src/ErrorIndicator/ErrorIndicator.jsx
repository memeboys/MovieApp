import React from 'react';
import { Alert } from 'antd';

export default class ErrorIndicator extends React.Component {
  render() {
    return <Alert message="Error" description={this.props.description} type="error" showIcon />;
  }
}
