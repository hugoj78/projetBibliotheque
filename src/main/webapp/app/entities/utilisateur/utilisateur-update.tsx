import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './utilisateur.reducer';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import  uuid from 'react-native-uuid';

// const uuid = require('react-native-uuid');

export interface IUtilisateurUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UtilisateurUpdate = (props: IUtilisateurUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { utilisateurEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/utilisateur');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...utilisateurEntity,
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
          <h2 id="projetBibliothequeApp.utilisateur.home.createOrEditLabel">Create or edit a Utilisateur</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : utilisateurEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup hidden="true">
                  <Label for="utilisateur-id">ID</Label>
                  <AvInput id="utilisateur-id" type="text" className="form-control" name="id" required readOnly value={uuid()}/>
                </AvGroup>
              ) : null}
              <AvGroup hidden="true">
                <Label id="idUtilisateurLabel" for="utilisateur-idUtilisateur">
                  Id Utilisateur
                </Label>
                <AvField
                  id="utilisateur-idUtilisateur"
                  type="text"
                  name="idUtilisateur"
                  value= {uuid()}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nomLabel" for="utilisateur-nom">
                  Nom
                </Label>
                <AvField id="utilisateur-nom" type="text" name="nom" />
              </AvGroup>
              <AvGroup>
                <Label id="prenomLabel" for="utilisateur-prenom">
                  Prenom
                </Label>
                <AvField id="utilisateur-prenom" type="text" name="prenom" />
              </AvGroup>
              <AvGroup>
                <Label id="dateNaissanceLabel" for="utilisateur-dateNaissance">
                  Date Naissance
                </Label>
                <AvField id="utilisateur-dateNaissance" type="date" className="form-control" name="dateNaissance" />
              </AvGroup>
              <AvGroup>
                <Label id="roleLabel" for="utilisateur-role">
                  Role
                </Label>
                <AvField id="utilisateur-role" type="text" name="role" />
              </AvGroup>
              <AvGroup>
                <Label id="pseudoLabel" for="utilisateur-pseudo">
                  Pseudo
                </Label>
                <AvField id="utilisateur-pseudo" type="text" name="pseudo" />
              </AvGroup>
              <AvGroup>
                <Label id="motDePasseLabel" for="utilisateur-motDePasse">
                  Mot De Passe
                </Label>
                <AvField id="utilisateur-motDePasse" type="password" name="motDePasse" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/utilisateur" replace color="info">
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
  utilisateurEntity: storeState.utilisateur.entity,
  loading: storeState.utilisateur.loading,
  updating: storeState.utilisateur.updating,
  updateSuccess: storeState.utilisateur.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UtilisateurUpdate);
