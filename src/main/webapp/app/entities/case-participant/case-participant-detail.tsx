import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './case-participant.reducer';
import { ICaseParticipant } from 'app/shared/model/case-participant.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICaseParticipantDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CaseParticipantDetail extends React.Component<ICaseParticipantDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { caseParticipantEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="cmApp.caseParticipant.detail.title">CaseParticipant</Translate> [<b>{caseParticipantEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="recordStatus">
                <Translate contentKey="cmApp.caseParticipant.recordStatus">Record Status</Translate>
              </span>
            </dt>
            <dd>{caseParticipantEntity.recordStatus}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="cmApp.caseParticipant.type">Type</Translate>
              </span>
            </dt>
            <dd>{caseParticipantEntity.type}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="cmApp.caseParticipant.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={caseParticipantEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">
                <Translate contentKey="cmApp.caseParticipant.endDate">End Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={caseParticipantEntity.endDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/case-participant" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/case-participant/${caseParticipantEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ caseParticipant }: IRootState) => ({
  caseParticipantEntity: caseParticipant.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseParticipantDetail);
