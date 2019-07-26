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
import { getEntity, updateEntity, createEntity, reset } from './case-header.reducer';
import { ICaseHeader } from 'app/shared/model/case-header.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICaseHeaderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICaseHeaderUpdateState {
  isNew: boolean;
  idscaseParticipant: any[];
}

export class CaseHeaderUpdate extends React.Component<ICaseHeaderUpdateProps, ICaseHeaderUpdateState> {
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
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const { caseHeaderEntity } = this.props;
      const entity = {
        ...caseHeaderEntity,
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
    this.props.history.push('/entity/case-header');
  };

  render() {
    const { caseHeaderEntity, caseParticipants, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cmApp.caseHeader.home.createOrEditLabel">
              <Translate contentKey="cmApp.caseHeader.home.createOrEditLabel">Create or edit a CaseHeader</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : caseHeaderEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="case-header-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="case-header-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="caseReferenceLabel" for="case-header-caseReference">
                    <Translate contentKey="cmApp.caseHeader.caseReference">Case Reference</Translate>
                  </Label>
                  <AvField id="case-header-caseReference" type="string" className="form-control" name="caseReference" />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="case-header-startDate">
                    <Translate contentKey="cmApp.caseHeader.startDate">Start Date</Translate>
                  </Label>
                  <AvInput
                    id="case-header-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.caseHeaderEntity.startDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="case-header-endDate">
                    <Translate contentKey="cmApp.caseHeader.endDate">End Date</Translate>
                  </Label>
                  <AvInput
                    id="case-header-endDate"
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.caseHeaderEntity.endDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="case-header-caseParticipant">
                    <Translate contentKey="cmApp.caseHeader.caseParticipant">Case Participant</Translate>
                  </Label>
                  <AvInput
                    id="case-header-caseParticipant"
                    type="select"
                    multiple
                    className="form-control"
                    name="caseParticipants"
                    value={caseHeaderEntity.caseParticipants && caseHeaderEntity.caseParticipants.map(e => e.id)}
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
                <Button tag={Link} id="cancel-save" to="/entity/case-header" replace color="info">
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
  caseHeaderEntity: storeState.caseHeader.entity,
  loading: storeState.caseHeader.loading,
  updating: storeState.caseHeader.updating,
  updateSuccess: storeState.caseHeader.updateSuccess
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
)(CaseHeaderUpdate);
