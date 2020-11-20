import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IExemplaire } from 'app/shared/model/exemplaire.model';
import { getEntities as getExemplaires } from 'app/entities/exemplaire/exemplaire.reducer';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { getEntities as getUtilisateurs } from 'app/entities/utilisateur/utilisateur.reducer';
import { getEntity, updateEntity, createEntity, reset } from './emprunt.reducer';
import { IEmprunt } from 'app/shared/model/emprunt.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmpruntUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmpruntUpdate = (props: IEmpruntUpdateProps) => {
  const [exemplaireId, setExemplaireId] = useState('0');
  const [utilisateurId, setUtilisateurId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { empruntEntity, exemplaires, utilisateurs, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/emprunt');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getExemplaires();
    props.getUtilisateurs();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...empruntEntity,
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
          <h2 id="projetBibliothequeApp.emprunt.home.createOrEditLabel">Create or edit a Emprunt</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : empruntEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="emprunt-id">ID</Label>
                  <AvInput id="emprunt-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idEmpruntLabel" for="emprunt-idEmprunt">
                  Id Emprunt
                </Label>
                <AvField
                  id="emprunt-idEmprunt"
                  type="text"
                  name="idEmprunt"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateEmpruntLabel" for="emprunt-dateEmprunt">
                  Date Emprunt
                </Label>
                <AvField id="emprunt-dateEmprunt" type="date" className="form-control" name="dateEmprunt" />
              </AvGroup>
              <AvGroup>
                <Label id="idUtilisateurLabel" for="emprunt-idUtilisateur">
                  Id Utilisateur
                </Label>
                <AvField id="emprunt-idUtilisateur" type="string" className="form-control" name="idUtilisateur" />
              </AvGroup>
              <AvGroup>
                <Label id="idExemplaireLabel" for="emprunt-idExemplaire">
                  Id Exemplaire
                </Label>
                <AvField id="emprunt-idExemplaire" type="string" className="form-control" name="idExemplaire" />
              </AvGroup>
              <AvGroup>
                <Label for="emprunt-exemplaire">Exemplaire</Label>
                <AvInput id="emprunt-exemplaire" type="select" className="form-control" name="exemplaire.id">
                  <option value="" key="0" />
                  {exemplaires
                    ? exemplaires.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.idExemplaire}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="emprunt-utilisateur">Utilisateur</Label>
                <AvInput id="emprunt-utilisateur" type="select" className="form-control" name="utilisateur.id">
                  <option value="" key="0" />
                  {utilisateurs
                    ? utilisateurs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.idUtilisateur}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/emprunt" replace color="info">
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
  exemplaires: storeState.exemplaire.entities,
  utilisateurs: storeState.utilisateur.entities,
  empruntEntity: storeState.emprunt.entity,
  loading: storeState.emprunt.loading,
  updating: storeState.emprunt.updating,
  updateSuccess: storeState.emprunt.updateSuccess,
});

const mapDispatchToProps = {
  getExemplaires,
  getUtilisateurs,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmpruntUpdate);
