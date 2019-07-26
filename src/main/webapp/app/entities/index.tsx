import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Participant from './participant';
import CaseParticipant from './case-participant';
import CaseHeader from './case-header';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/participant`} component={Participant} />
      <ErrorBoundaryRoute path={`${match.url}/case-participant`} component={CaseParticipant} />
      <ErrorBoundaryRoute path={`${match.url}/case-header`} component={CaseHeader} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
