/* eslint-disable
  react/jsx-filename-extension,
  global-require,
  import/no-extraneous-dependencies
*/
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SmartTable from './SmartTable/SmartTable';

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

const data = [{
  name: 'John',
  status: 'Single',
  birthDate: '1 Jan 1966'
}, {
  name: 'David',
  status: 'Married',
  birthDate: '5 Feb 1914'
}]

render(
  <MuiThemeProvider muiTheme={ getMuiTheme(lightBaseTheme) }>
    <SmartTable
      isLoading={ false }
      data={ data }
      headers={ headers }
      limit={ 40 }
      total={ data.length }
    />
  </MuiThemeProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./SmartTable/SmartTable', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./SmartTable/SmartTable').default;

    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
