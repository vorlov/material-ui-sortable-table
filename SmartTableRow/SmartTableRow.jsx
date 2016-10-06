import { TableRow, TableRowColumn } from 'material-ui/Table';
import React, { PropTypes, Component } from 'react';
import formatTableCell from './formatTableCell';

class SmartTableRow extends Component {
  render() {
    const { index, row, tableHeaders } = this.props;
    return (
      <TableRow key={ index }>
        { tableHeaders.map((header, propIndex) => (
          <TableRowColumn key={ propIndex }>{ formatTableCell(row[header.dataAlias], header.format, row) }</TableRowColumn>
        )) }
      </TableRow>
    );
  }
}

SmartTableRow.propTypes = {
  index: PropTypes.number,
  row: PropTypes.object,
  tableHeaders: PropTypes.array
};

export default SmartTableRow;
