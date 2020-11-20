import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './utilisateur.reducer';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUtilisateurDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UtilisateurDetail = (props: IUtilisateurDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { utilisateurEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Utilisateur [<b>{utilisateurEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idUtilisateur">Id Utilisateur</span>
          </dt>
          <dd>{utilisateurEntity.idUtilisateur}</dd>
          <dt>
            <span id="nom">Nom</span>
          </dt>
          <dd>{utilisateurEntity.nom}</dd>
          <dt>
            <span id="prenom">Prenom</span>
          </dt>
          <dd>{utilisateurEntity.prenom}</dd>
          <dt>
            <span id="dateNaissance">Date Naissance</span>
          </dt>
          <dd>
            {utilisateurEntity.dateNaissance ? (
              <TextFormat value={utilisateurEntity.dateNaissance} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="role">Role</span>
          </dt>
          <dd>{utilisateurEntity.role}</dd>
          <dt>
            <span id="pseudo">Pseudo</span>
          </dt>
          <dd>{utilisateurEntity.pseudo}</dd>
          <dt>
            <span id="motDePasse">Mot De Passe</span>
          </dt>
          <dd>{utilisateurEntity.motDePasse}</dd>
        </dl>
        <Button tag={Link} to="/utilisateur" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/utilisateur/${utilisateurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ utilisateur }: IRootState) => ({
  utilisateurEntity: utilisateur.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UtilisateurDetail);
