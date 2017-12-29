import { TableRow, TableRowColumn } from 'material-ui/Table';
import React from 'react';
import PropTypes from 'prop-types';
import formatTableCell from './formatTableCell';

const SmartTableRow = ({
  row,
  headers
}) => (
  <TableRow>
    { headers.map((header, propIndex) => (
      <TableRowColumn key={ propIndex }>
        { formatTableCell(row[header.dataAlias], header.format) }
      </TableRowColumn>
    )) }
  </TableRow>
)

SmartTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  headers: PropTypes.array.isRequired
};

export default SmartTableRow;
