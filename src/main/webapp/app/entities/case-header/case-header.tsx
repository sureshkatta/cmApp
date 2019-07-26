import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './case-header.reducer';
import { ICaseHeader } from 'app/shared/model/case-header.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICaseHeaderProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CaseHeader extends React.Component<ICaseHeaderProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { caseHeaderList, match } = this.props;
    return (
      <div>
        <h2 id="case-header-heading">
          <Translate contentKey="cmApp.caseHeader.home.title">Case Headers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="cmApp.caseHeader.home.createLabel">Create new Case Header</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {caseHeaderList && caseHeaderList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cmApp.caseHeader.caseReference">Case Reference</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cmApp.caseHeader.startDate">Start Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cmApp.caseHeader.endDate">End Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cmApp.caseHeader.caseParticipant">Case Participant</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {caseHeaderList.map((caseHeader, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${caseHeader.id}`} color="link" size="sm">
                        {caseHeader.id}
                      </Button>
                    </td>
                    <td>{caseHeader.caseReference}</td>
                    <td>
                      <TextFormat type="date" value={caseHeader.startDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={caseHeader.endDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      {caseHeader.caseParticipants
                        ? caseHeader.caseParticipants.map((val, j) => (
                            <span key={j}>
                              <Link to={`case-participant/${val.id}`}>{val.id}</Link>
                              {j === caseHeader.caseParticipants.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${caseHeader.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${caseHeader.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${caseHeader.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="cmApp.caseHeader.home.notFound">No Case Headers found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ caseHeader }: IRootState) => ({
  caseHeaderList: caseHeader.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseHeader);
