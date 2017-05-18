import numeral from 'numeral';
import React from 'react';
import { Link } from 'react-router';
import { FlatButton } from 'material-ui';

export default (cell, format, row) => {
  switch (format && format.type) {
    case 'link':
      return (
        <Link
          style={ { color: 'black' } }
          to={ `${format.url}` }
        >
          { cell }
        </Link>
      );
    case 'button':
      return (
        <FlatButton
          primary
          label={ `${format.text}` }
        />
      );
    case 'date':
      return new Date();
    case 'percentage':
      return `${numeral(cell).format('0.0')}%`;
    case 'money':
      return `$${numeral(cell).format('0,0.00')}`;
    default:
      return cell;
  }
};
