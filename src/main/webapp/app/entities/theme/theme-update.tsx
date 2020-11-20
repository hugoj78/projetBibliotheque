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
import { getEntity, updateEntity, createEntity, reset } from './theme.reducer';
import { ITheme } from 'app/shared/model/theme.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IThemeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ThemeUpdate = (props: IThemeUpdateProps) => {
  const [livreId, setLivreId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { themeEntity, livres, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/theme');
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
        ...themeEntity,
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
          <h2 id="projetBibliothequeApp.theme.home.createOrEditLabel">Create or edit a Theme</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : themeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="theme-id">ID</Label>
                  <AvInput id="theme-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idThemeLabel" for="theme-idTheme">
                  Id Theme
                </Label>
                <AvField
                  id="theme-idTheme"
                  type="text"
                  name="idTheme"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="themeLabel" for="theme-theme">
                  Theme
                </Label>
                <AvField id="theme-theme" type="text" name="theme" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/theme" replace color="info">
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
  themeEntity: storeState.theme.entity,
  loading: storeState.theme.loading,
  updating: storeState.theme.updating,
  updateSuccess: storeState.theme.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(ThemeUpdate);
