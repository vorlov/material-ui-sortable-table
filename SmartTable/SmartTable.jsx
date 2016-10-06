import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import { SmartTableRow } from '../SmartTableRow/SmartTableRow';
import { TableSpinner } from '../TableSpinner/TableSpinner';
import React, { PropTypes, Component } from 'react';
import SortIcon from 'material-ui/svg-icons/action/swap-vert';
import IconButton from 'material-ui/IconButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import styles from './SmartTable.scss';

function sortFunc(a, b, key) {
  if (typeof (a[key]) === 'number') {
    return a[key] - b[key];
  }

  const ax = [];
  const bx = [];

  a[key].replace(/(\d+)|(\D+)/g, (_, $1, $2) => { ax.push([$1 || Infinity, $2 || '']); });
  b[key].replace(/(\d+)|(\D+)/g, (_, $1, $2) => { bx.push([$1 || Infinity, $2 || '']); });

  while (ax.length && bx.length) {
    const an = ax.shift();
    const bn = bx.shift();
    const nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }

  return ax.length - bx.length;
}

//converts object  { a: 55, b: 55, c: { d: 55 } } to { a: 55, b: 55, d: 55 }
export function processTableData(data) {
  if (data.constructor === Array) {
    return data.map(obj => {
      const newObj = {};

      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
          Object.keys(obj[key]).forEach(subKey => {
            newObj[subKey] = obj[key][subKey];
          });
        } else {
          newObj[key] = obj[key];
        }
      });

      return newObj;
    });
  }
  return [];
}

class SmartTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAsc: true,
      sortHeader: null,
      offset: 0,
      limit: props.limit,
      page: []
    };
  }

  componentWillMount() {
    this.setState({
      data: this.props.data,
      page: this.props.data ? this.props.data.slice(this.state.offset, this.props.limit) : [],
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      offset: 0,
      sortHeader: null,
      data: nextProps.data,
      page: nextProps.data ? nextProps.data.slice(this.state.offset, nextProps.limit) : [],
    });
  }

  sortByColumn(sortHeader, data, limit) {
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

  paginate(offset, limit) {
    this.setState({
      page: this.state.data.slice(offset, offset + limit),
      offset,
    });
  }

  render() {

    const { total, tableHeaders, isLoading } = this.props;
    const { offset, limit, page } = this.state;

    const processedData = processTableData(page);

    return (
      <Table className={ styles.table } selectable={ false }>
        <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
          <TableRow>
            { !!tableHeaders && tableHeaders.map((header, index) => (
              <TableHeaderColumn key={ index }>
                <div className={ styles.rowAlign }>
                  { header.alias }
                  { header.sortable &&
                    <SortIcon
                      id={ header.dataAlias }
                      className={ styles.sortIcon }
                      onMouseUp={ (e) => this.sortByColumn(e.target.id, this.state.data, limit) }
                    />
                  }
                </div>
              </TableHeaderColumn>
            )) }
          </TableRow>
        </TableHeader>
        <TableBody showRowHover stripedRows displayRowCheckbox={ false } preScanRows>
          {
            (isLoading && <TableSpinner />) ||
            (processedData.map((row, index) => (
              <SmartTableRow key={ index } { ...{ row, index, tableHeaders } } />
            )))
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableRowColumn>
              <div className={ styles.footerControls }>
                { `${Math.min((offset + 1), total)} - ${Math.min((offset + limit), total)} of ${total}` }
                <IconButton disabled={ offset === 0 } onClick={ () => this.paginate(offset - limit, limit) }>
                  <ChevronLeft />
                </IconButton>
                <IconButton disabled={ offset + limit >= total } onClick={ () => this.paginate(offset + limit, limit) }>
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

SmartTable.propTypes = {
  tableHeaders: PropTypes.array,
  data: PropTypes.array,
  offset: PropTypes.number, // current offset
  total: PropTypes.number, // total number of rows
  limit: PropTypes.number, // num of rows in each page,
  isLoading: PropTypes.bool,
};

export default SmartTable;
