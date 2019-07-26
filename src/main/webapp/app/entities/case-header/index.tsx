import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CaseHeader from './case-header';
import CaseHeaderDetail from './case-header-detail';
import CaseHeaderUpdate from './case-header-update';
import CaseHeaderDeleteDialog from './case-header-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CaseHeaderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CaseHeaderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CaseHeaderDetail} />
      <ErrorBoundaryRoute path={match.url} component={CaseHeader} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CaseHeaderDeleteDialog} />
  </>
);

export default Routes;
