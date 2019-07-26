import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './case-header.reducer';
import { ICaseHeader } from 'app/shared/model/case-header.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICaseHeaderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CaseHeaderDetail extends React.Component<ICaseHeaderDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { caseHeaderEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="cmApp.caseHeader.detail.title">CaseHeader</Translate> [<b>{caseHeaderEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="caseReference">
                <Translate contentKey="cmApp.caseHeader.caseReference">Case Reference</Translate>
              </span>
            </dt>
            <dd>{caseHeaderEntity.caseReference}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="cmApp.caseHeader.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={caseHeaderEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">
                <Translate contentKey="cmApp.caseHeader.endDate">End Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={caseHeaderEntity.endDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="cmApp.caseHeader.caseParticipant">Case Participant</Translate>
            </dt>
            <dd>
              {caseHeaderEntity.caseParticipants
                ? caseHeaderEntity.caseParticipants.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === caseHeaderEntity.caseParticipants.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/case-header" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/case-header/${caseHeaderEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ caseHeader }: IRootState) => ({
  caseHeaderEntity: caseHeader.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseHeaderDetail);
