import { TableRow, TableRowColumn } from 'material-ui/Table';
import React, { PropTypes } from 'react';
import formatTableCell from './formatTableCell';

const SmartTableRow = ({ index, row, tableHeaders }) => (
  <TableRow key={ index }>
    { tableHeaders.map((header, propIndex) => (
      <TableRowColumn key={ propIndex }>
        { formatTableCell(row[header.dataAlias], header.format, row) }
      </TableRowColumn>
    )) }
  </TableRow>
)

SmartTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  row: PropTypes.object.isRequired,
  tableHeaders: PropTypes.array.isRequired
};

export default SmartTableRow;
