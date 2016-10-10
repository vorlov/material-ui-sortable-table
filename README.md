# material-ui-sortable-table
Material UI Table component with sorting and pagination functionality

Example of usage
```javascript
<SmartTable { ...{ tableHeaders, data, limit: 20, total: data.length, isLoading } } />
```

isLoading - the flag that indicates data loading, if true spinner will be shown.
Usually it's passed from any state container on request action.

example of tableHeaders
```javascript
const tableHeaders = [
  { alias: 'Name', sortable: true, dataAlias: 'name', format: { type: 'link', url: 'http://someurl' } },
  { alias: 'Status', sortable: true, dataAlias: 'status', format: { type: 'status' } },
  { alias: 'Birth Date', sortable: true, dataAlias: 'birth_date', format: { type: 'date' } }]
```

alias - name of column in the column header
sortable - show or not sortable icon in the column header
dataAlias - property name of the object in the data array,
format - object that sets up any additional info about cell or custom formatting to cell in the row (Button, Link, etc)

example of data
```javascript
[
  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },
]
```