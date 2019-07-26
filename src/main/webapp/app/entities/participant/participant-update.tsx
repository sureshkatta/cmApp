import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICaseParticipant } from 'app/shared/model/case-participant.model';
import { getEntities as getCaseParticipants } from 'app/entities/case-participant/case-participant.reducer';
import { getEntity, updateEntity, createEntity, reset } from './participant.reducer';
import { IParticipant } from 'app/shared/model/participant.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IParticipantUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IParticipantUpdateState {
  isNew: boolean;
  idscaseParticipant: any[];
}

export class ParticipantUpdate extends React.Component<IParticipantUpdateProps, IParticipantUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idscaseParticipant: [],
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

    this.props.getCaseParticipants();
  }

  saveEntity = (event, errors, values) => {
    values.registrationDate = convertDateTimeToServer(values.registrationDate);

    if (errors.length === 0) {
      const { participantEntity } = this.props;
      const entity = {
        ...participantEntity,
        ...values,
        caseParticipants: mapIdList(values.caseParticipants)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/participant');
  };

  render() {
    const { participantEntity, caseParticipants, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cmApp.participant.home.createOrEditLabel">
              <Translate contentKey="cmApp.participant.home.createOrEditLabel">Create or edit a Participant</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : participantEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="participant-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="participant-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="firstNameLabel" for="participant-firstName">
                    <Translate contentKey="cmApp.participant.firstName">First Name</Translate>
                  </Label>
                  <AvField id="participant-firstName" type="text" name="firstName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="participant-lastName">
                    <Translate contentKey="cmApp.participant.lastName">Last Name</Translate>
                  </Label>
                  <AvField id="participant-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="participant-email">
                    <Translate contentKey="cmApp.participant.email">Email</Translate>
                  </Label>
                  <AvField id="participant-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneNumberLabel" for="participant-phoneNumber">
                    <Translate contentKey="cmApp.participant.phoneNumber">Phone Number</Translate>
                  </Label>
                  <AvField id="participant-phoneNumber" type="text" name="phoneNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="registrationDateLabel" for="participant-registrationDate">
                    <Translate contentKey="cmApp.participant.registrationDate">Registration Date</Translate>
                  </Label>
                  <AvInput
                    id="participant-registrationDate"
                    type="datetime-local"
                    className="form-control"
                    name="registrationDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.participantEntity.registrationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="participant-caseParticipant">
                    <Translate contentKey="cmApp.participant.caseParticipant">Case Participant</Translate>
                  </Label>
                  <AvInput
                    id="participant-caseParticipant"
                    type="select"
                    multiple
                    className="form-control"
                    name="caseParticipants"
                    value={participantEntity.caseParticipants && participantEntity.caseParticipants.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {caseParticipants
                      ? caseParticipants.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/participant" replace color="info">
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
  caseParticipants: storeState.caseParticipant.entities,
  participantEntity: storeState.participant.entity,
  loading: storeState.participant.loading,
  updating: storeState.participant.updating,
  updateSuccess: storeState.participant.updateSuccess
});

const mapDispatchToProps = {
  getCaseParticipants,
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
)(ParticipantUpdate);
