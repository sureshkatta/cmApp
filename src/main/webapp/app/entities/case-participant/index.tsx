import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CaseParticipant from './case-participant';
import CaseParticipantDetail from './case-participant-detail';
import CaseParticipantUpdate from './case-participant-update';
import CaseParticipantDeleteDialog from './case-participant-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CaseParticipantUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CaseParticipantUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CaseParticipantDetail} />
      <ErrorBoundaryRoute path={match.url} component={CaseParticipant} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CaseParticipantDeleteDialog} />
  </>
);

export default Routes;
