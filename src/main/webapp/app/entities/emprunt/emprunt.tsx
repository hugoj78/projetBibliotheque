import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './emprunt.reducer';
import { IEmprunt } from 'app/shared/model/emprunt.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmpruntProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Emprunt = (props: IEmpruntProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { empruntList, match, loading } = props;
  return (
    <div>
      <h2 id="emprunt-heading">
        Emprunts
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Emprunt
        </Link>
      </h2>
      <div className="table-responsive">
        {empruntList && empruntList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Id Emprunt</th>
                <th>Date Emprunt</th>
                <th>Id Utilisateur</th>
                <th>Id Exemplaire</th>
                <th>Exemplaire</th>
                <th>Utilisateur</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {empruntList.map((emprunt, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${emprunt.id}`} color="link" size="sm">
                      {emprunt.id}
                    </Button>
                  </td>
                  <td>{emprunt.idEmprunt}</td>
                  <td>
                    {emprunt.dateEmprunt ? <TextFormat type="date" value={emprunt.dateEmprunt} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{emprunt.idUtilisateur}</td>
                  <td>{emprunt.idExemplaire}</td>
                  <td>
                    {emprunt.exemplaire ? <Link to={`exemplaire/${emprunt.exemplaire.id}`}>{emprunt.exemplaire.idExemplaire}</Link> : ''}
                  </td>
                  <td>
                    {emprunt.utilisateur ? (
                      <Link to={`utilisateur/${emprunt.utilisateur.id}`}>{emprunt.utilisateur.idUtilisateur}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${emprunt.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${emprunt.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${emprunt.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Emprunts found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ emprunt }: IRootState) => ({
  empruntList: emprunt.entities,
  loading: emprunt.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Emprunt);
