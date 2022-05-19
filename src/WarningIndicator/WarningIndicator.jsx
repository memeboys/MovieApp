import React from 'react';
import { Alert } from 'antd';

export default class WarningIndicator extends React.Component {
  render() {
    return (
      <Alert
        message="It looks like you have slow internet, please check your network settings or try again later"
        type="warning"
        showIcon
      />
    );
  }
}
