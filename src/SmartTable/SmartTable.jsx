import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableFooter,
  TableHeaderColumn,
  TableRowColumn
} from 'material-ui/Table';
import SortIcon from 'material-ui/svg-icons/action/swap-vert';
import IconButton from 'material-ui/IconButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import SmartTableRow from '../SmartTableRow/SmartTableRow';
import TableSpinner from '../TableSpinner/TableSpinner';
import styles from './SmartTable.scss';
import sortFunc from './sortFunc';

class SmartTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAsc: true,
      sortHeader: null,
      offset: 0,
      limit: props.limit,
      data: props.data,
      page: props.data.slice(0, props.limit)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sortHeader: null,
      offset: 0,
      data: nextProps.data,
      page: nextProps.data.slice(this.state.offset, nextProps.limit)
    });
  }

  sortByColumn = (e) => {
    const sortHeader = e.target.id;
    const {
      data,
      limit
    } = this.state

    const isAsc = this.state.sortHeader === sortHeader ? !this.state.isAsc : true;
    const sortedData = data.sort((a, b) => sortFunc(a, b, sortHeader));

    if (!isAsc) {
      sortedData.reverse();
    }

    this.setState({
      page: sortedData.slice(0, limit),
      data: sortedData,
      sortHeader,
      offset: 0,
      isAsc
    });
  }

  paginate = (offset, limit) => {
    const { data } = this.state;
    this.setState({
      page: data.slice(offset, offset + limit),
      offset,
    });
  }

  paginateBack = () => {
    const { offset, limit } = this.state;
    this.paginate(offset - limit, limit);
  }

  paginateForward = () => {
    const { offset, limit } = this.state;
    this.paginate(offset + limit, limit);
  }

  render() {

    const {
      total,
      headers,
      isLoading
    } = this.props;

    const {
      offset,
      limit,
      page
    } = this.state;

    return (
      <Table
        className={ styles.table }
        selectable={ false }
      >
        <TableHeader
          displaySelectAll={ false }
          adjustForCheckbox={ false }
        >
          <TableRow>
            { headers && headers.map((header, index) => (
              <TableHeaderColumn key={ index }>
                <div className={ styles.headerColumn }>
                  { header.alias }
                  { header.sortable &&
                    <SortIcon
                      id={ header.dataAlias }
                      className={ styles.sortIcon }
                      onMouseUp={ this.sortByColumn }
                    />
                  }
                </div>
              </TableHeaderColumn>
            )) }
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover
          stripedRows
          displayRowCheckbox={ false }
          preScanRows
        >
          { isLoading && <TableSpinner /> }
          { !isLoading &&
            page.map((row, index) => (
              <SmartTableRow
                key={ index }
                row={ row }
                headers={ headers }
              />
            ))
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableRowColumn>
              <div className={ styles.footerControls }>
                { `${Math.min((offset + 1), total)} - ${Math.min((offset + limit), total)} of ${total}` }
                <IconButton
                  disabled={ offset === 0 }
                  onClick={ this.paginateBack }
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  disabled={ offset + limit >= total }
                  onClick={ this.paginateForward }
                >
                  <ChevronRight />
                </IconButton>
              </div>
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

SmartTable.defaultProps = {
  limit: 40,
  data: [],
  isLoading: false
}

SmartTable.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array,
  offset: PropTypes.number, // current offset
  total: PropTypes.number, // total number of rows
  limit: PropTypes.number, // num of rows in each page,
  isLoading: PropTypes.bool,
};

export default SmartTable;
