import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IParticipant } from 'app/shared/model/participant.model';
import { getEntities as getParticipants } from 'app/entities/participant/participant.reducer';
import { ICaseHeader } from 'app/shared/model/case-header.model';
import { getEntities as getCaseHeaders } from 'app/entities/case-header/case-header.reducer';
import { getEntity, updateEntity, createEntity, reset } from './case-participant.reducer';
import { ICaseParticipant } from 'app/shared/model/case-participant.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICaseParticipantUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICaseParticipantUpdateState {
  isNew: boolean;
  participantId: string;
  caseHeaderId: string;
}

export class CaseParticipantUpdate extends React.Component<ICaseParticipantUpdateProps, ICaseParticipantUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      participantId: '0',
      caseHeaderId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getParticipants();
    this.props.getCaseHeaders();
  }

  saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const { caseParticipantEntity } = this.props;
      const entity = {
        ...caseParticipantEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/case-participant');
  };

  render() {
    const { caseParticipantEntity, participants, caseHeaders, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cmApp.caseParticipant.home.createOrEditLabel">
              <Translate contentKey="cmApp.caseParticipant.home.createOrEditLabel">Create or edit a CaseParticipant</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : caseParticipantEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="case-participant-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="case-participant-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="recordStatusLabel" for="case-participant-recordStatus">
                    <Translate contentKey="cmApp.caseParticipant.recordStatus">Record Status</Translate>
                  </Label>
                  <AvField id="case-participant-recordStatus" type="text" name="recordStatus" />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="case-participant-type">
                    <Translate contentKey="cmApp.caseParticipant.type">Type</Translate>
                  </Label>
                  <AvField id="case-participant-type" type="text" name="type" />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="case-participant-startDate">
                    <Translate contentKey="cmApp.caseParticipant.startDate">Start Date</Translate>
                  </Label>
                  <AvInput
                    id="case-participant-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.caseParticipantEntity.startDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="case-participant-endDate">
                    <Translate contentKey="cmApp.caseParticipant.endDate">End Date</Translate>
                  </Label>
                  <AvInput
                    id="case-participant-endDate"
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.caseParticipantEntity.endDate)}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/case-participant" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  participants: storeState.participant.entities,
  caseHeaders: storeState.caseHeader.entities,
  caseParticipantEntity: storeState.caseParticipant.entity,
  loading: storeState.caseParticipant.loading,
  updating: storeState.caseParticipant.updating,
  updateSuccess: storeState.caseParticipant.updateSuccess
});

const mapDispatchToProps = {
  getParticipants,
  getCaseHeaders,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseParticipantUpdate);
