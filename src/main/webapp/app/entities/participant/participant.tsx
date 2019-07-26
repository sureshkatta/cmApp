import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './participant.reducer';
import { IParticipant } from 'app/shared/model/participant.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IParticipantProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Participant extends React.Component<IParticipantProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { participantList, match } = this.props;
    return (
      <div>
        <h2 id="participant-heading">
          <Translate contentKey="cmApp.participant.home.title">Participants</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="cmApp.participant.home.createLabel">Create new Participant</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {participantList && participantList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cmApp.participant.firstName">First Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cmApp.participant.lastName">Last Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cmApp.participant.email">Email</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cmApp.participant.phoneNumber">Phone Number</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cmApp.participant.registrationDate">Registration Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cmApp.participant.caseParticipant">Case Participant</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {participantList.map((participant, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${participant.id}`} color="link" size="sm">
                        {participant.id}
                      </Button>
                    </td>
                    <td>{participant.firstName}</td>
                    <td>{participant.lastName}</td>
                    <td>{participant.email}</td>
                    <td>{participant.phoneNumber}</td>
                    <td>
                      <TextFormat type="date" value={participant.registrationDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      {participant.caseParticipants
                        ? participant.caseParticipants.map((val, j) => (
                            <span key={j}>
                              <Link to={`case-participant/${val.id}`}>{val.id}</Link>
                              {j === participant.caseParticipants.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${participant.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${participant.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${participant.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="cmApp.participant.home.notFound">No Participants found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ participant }: IRootState) => ({
  participantList: participant.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Participant);
