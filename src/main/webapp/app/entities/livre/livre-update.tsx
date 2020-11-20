import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmplacement } from 'app/shared/model/emplacement.model';
import { getEntities as getEmplacements } from 'app/entities/emplacement/emplacement.reducer';
import { IAutheur } from 'app/shared/model/autheur.model';
import { getEntities as getAutheurs } from 'app/entities/autheur/autheur.reducer';
import { ITheme } from 'app/shared/model/theme.model';
import { getEntities as getThemes } from 'app/entities/theme/theme.reducer';
import { getEntity, updateEntity, createEntity, reset } from './livre.reducer';
import { ILivre } from 'app/shared/model/livre.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILivreUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LivreUpdate = (props: ILivreUpdateProps) => {
  const [idstheme, setIdstheme] = useState([]);
  const [emplacementId, setEmplacementId] = useState('0');
  const [autheurId, setAutheurId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { livreEntity, emplacements, autheurs, themes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/livre');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmplacements();
    props.getAutheurs();
    props.getThemes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...livreEntity,
        ...values,
        themes: mapIdList(values.themes),
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
          <h2 id="projetBibliothequeApp.livre.home.createOrEditLabel">Create or edit a Livre</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : livreEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="livre-id">ID</Label>
                  <AvInput id="livre-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idLivreLabel" for="livre-idLivre">
                  Id Livre
                </Label>
                <AvField
                  id="livre-idLivre"
                  type="text"
                  name="idLivre"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="titreLabel" for="livre-titre">
                  Titre
                </Label>
                <AvField id="livre-titre" type="text" name="titre" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="livre-description">
                  Description
                </Label>
                <AvField id="livre-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="isbnLabel" for="livre-isbn">
                  Isbn
                </Label>
                <AvField id="livre-isbn" type="text" name="isbn" />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="livre-code">
                  Code
                </Label>
                <AvField id="livre-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label for="livre-emplacement">Emplacement</Label>
                <AvInput id="livre-emplacement" type="select" className="form-control" name="emplacement.id">
                  <option value="" key="0" />
                  {emplacements
                    ? emplacements.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.idEmplacement}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="livre-autheur">Autheur</Label>
                <AvInput id="livre-autheur" type="select" className="form-control" name="autheur.id">
                  <option value="" key="0" />
                  {autheurs
                    ? autheurs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.idAutheur}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="livre-theme">Theme</Label>
                <AvInput
                  id="livre-theme"
                  type="select"
                  multiple
                  className="form-control"
                  name="themes"
                  value={livreEntity.themes && livreEntity.themes.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {themes
                    ? themes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.idTheme}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/livre" replace color="info">
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
  emplacements: storeState.emplacement.entities,
  autheurs: storeState.autheur.entities,
  themes: storeState.theme.entities,
  livreEntity: storeState.livre.entity,
  loading: storeState.livre.loading,
  updating: storeState.livre.updating,
  updateSuccess: storeState.livre.updateSuccess,
});

const mapDispatchToProps = {
  getEmplacements,
  getAutheurs,
  getThemes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LivreUpdate);
