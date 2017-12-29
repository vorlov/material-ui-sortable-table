# material-ui-sortable-table
Material UI Table component with sorting and pagination functionality

Example of usage
npm i
npm run dev
```javascript
<SmartTable
  isLoading={ false }
  data={ data }
  headers={ headers }
  limit={ 40 }
  total={ data.length }
/>
```

isLoading - the flag that indicates data loading, if true spinner will be shown.
Usually it's passed from any state container on request action.

example of tableHeaders
```javascript
const headers = [{
  alias: 'Name',
  sortable: true,
  dataAlias: 'name',
  format: {
    type: 'link',
    url: 'http://someurl'
  }
}, {
  alias: 'Status',
  sortable: true,
  dataAlias: 'status'
}, {
  alias: 'Birth Date',
  sortable: true,
  dataAlias: 'birthDate',
  format: {
    type: 'date'
  }
}];
```

alias - name of column in the column header <br />
sortable - show or not sortable icon in the column header <br />
dataAlias - property name of the object in the data array <br />
format - object that sets up any additional info about cell or custom formatting to cell in the row (Button, Link, etc) <br />

example of data
```javascript
[{
  name: 'John',
  status: 'Single',
  birthDate: '1 Jan 1966'
}, {
  name: 'David',
  status: 'Married',
  birthDate: '5 Feb 1914'
}]
```

For now that is custom solution and will be changed by build-in functionality in the future release of Material UI components library

