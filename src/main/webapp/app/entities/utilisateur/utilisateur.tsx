import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './utilisateur.reducer';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUtilisateurProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Utilisateur = (props: IUtilisateurProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { utilisateurList, match, loading } = props;
  return (
    <div>
      <h2 id="utilisateur-heading">
        Utilisateurs
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Utilisateur
        </Link>
      </h2>
      <div className="table-responsive">
        {utilisateurList && utilisateurList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Id Utilisateur</th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Date Naissance</th>
                <th>Role</th>
                <th>Pseudo</th>
                <th>Mot De Passe</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {utilisateurList.map((utilisateur, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${utilisateur.id}`} color="link" size="sm">
                      {utilisateur.id}
                    </Button>
                  </td>
                  <td>{utilisateur.idUtilisateur}</td>
                  <td>{utilisateur.nom}</td>
                  <td>{utilisateur.prenom}</td>
                  <td>
                    {utilisateur.dateNaissance ? (
                      <TextFormat type="date" value={utilisateur.dateNaissance} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{utilisateur.role}</td>
                  <td>{utilisateur.pseudo}</td>
                  <td>{utilisateur.motDePasse}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${utilisateur.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${utilisateur.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${utilisateur.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Utilisateurs found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ utilisateur }: IRootState) => ({
  utilisateurList: utilisateur.entities,
  loading: utilisateur.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Utilisateur);
