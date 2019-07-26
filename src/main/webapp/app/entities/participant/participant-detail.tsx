import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './participant.reducer';
import { IParticipant } from 'app/shared/model/participant.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IParticipantDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ParticipantDetail extends React.Component<IParticipantDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { participantEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="cmApp.participant.detail.title">Participant</Translate> [<b>{participantEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="firstName">
                <Translate contentKey="cmApp.participant.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{participantEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="cmApp.participant.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{participantEntity.lastName}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="cmApp.participant.email">Email</Translate>
              </span>
            </dt>
            <dd>{participantEntity.email}</dd>
            <dt>
              <span id="phoneNumber">
                <Translate contentKey="cmApp.participant.phoneNumber">Phone Number</Translate>
              </span>
            </dt>
            <dd>{participantEntity.phoneNumber}</dd>
            <dt>
              <span id="registrationDate">
                <Translate contentKey="cmApp.participant.registrationDate">Registration Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={participantEntity.registrationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="cmApp.participant.caseParticipant">Case Participant</Translate>
            </dt>
            <dd>
              {participantEntity.caseParticipants
                ? participantEntity.caseParticipants.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === participantEntity.caseParticipants.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/participant" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/participant/${participantEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ participant }: IRootState) => ({
  participantEntity: participant.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticipantDetail);
