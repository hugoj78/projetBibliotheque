import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILivre } from 'app/shared/model/livre.model';
import { getEntities as getLivres } from 'app/entities/livre/livre.reducer';
import { getEntity, updateEntity, createEntity, reset } from './exemplaire.reducer';
import { IExemplaire } from 'app/shared/model/exemplaire.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IExemplaireUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ExemplaireUpdate = (props: IExemplaireUpdateProps) => {
  const [livreId, setLivreId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { exemplaireEntity, livres, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/exemplaire');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getLivres();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...exemplaireEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="projetBibliothequeApp.exemplaire.home.createOrEditLabel">Create or edit a Exemplaire</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : exemplaireEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="exemplaire-id">ID</Label>
                  <AvInput id="exemplaire-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idExemplaireLabel" for="exemplaire-idExemplaire">
                  Id Exemplaire
                </Label>
                <AvField
                  id="exemplaire-idExemplaire"
                  type="text"
                  name="idExemplaire"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="disponibiliteLabel">
                  <AvInput id="exemplaire-disponibilite" type="checkbox" className="form-check-input" name="disponibilite" />
                  Disponibilite
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="idLivreLabel" for="exemplaire-idLivre">
                  Id Livre
                </Label>
                <AvField id="exemplaire-idLivre" type="string" className="form-control" name="idLivre" />
              </AvGroup>
              <AvGroup>
                <Label for="exemplaire-livre">Livre</Label>
                <AvInput id="exemplaire-livre" type="select" className="form-control" name="livre.id">
                  <option value="" key="0" />
                  {livres
                    ? livres.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.idLivre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/exemplaire" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  livres: storeState.livre.entities,
  exemplaireEntity: storeState.exemplaire.entity,
  loading: storeState.exemplaire.loading,
  updating: storeState.exemplaire.updating,
  updateSuccess: storeState.exemplaire.updateSuccess,
});

const mapDispatchToProps = {
  getLivres,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ExemplaireUpdate);
