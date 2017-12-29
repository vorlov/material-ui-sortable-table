import React from 'react';
import { FlatButton } from 'material-ui';

export default (cell, format) => {
  switch (format && format.type) {
    case 'link':
      return (
        <a href={ format.url } >
          { cell }
        </a>
      );
    case 'button':
      return (
        <FlatButton
          primary
          label={ `${format.text}` }
        />
      );
    case 'date':
      return new Date().toISOString();
    default:
      return cell;
  }
};
