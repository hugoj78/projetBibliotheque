import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './exemplaire.reducer';
import { IExemplaire } from 'app/shared/model/exemplaire.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExemplaireProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Exemplaire = (props: IExemplaireProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { exemplaireList, match, loading } = props;
  return (
    <div>
      <h2 id="exemplaire-heading">
        Exemplaires
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Exemplaire
        </Link>
      </h2>
      <div className="table-responsive">
        {exemplaireList && exemplaireList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Id Exemplaire</th>
                <th>Disponibilite</th>
                <th>Id Livre</th>
                <th>Livre</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {exemplaireList.map((exemplaire, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${exemplaire.id}`} color="link" size="sm">
                      {exemplaire.id}
                    </Button>
                  </td>
                  <td>{exemplaire.idExemplaire}</td>
                  <td>{exemplaire.disponibilite ? 'true' : 'false'}</td>
                  <td>{exemplaire.idLivre}</td>
                  <td>{exemplaire.livre ? <Link to={`livre/${exemplaire.livre.id}`}>{exemplaire.livre.idLivre}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${exemplaire.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${exemplaire.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${exemplaire.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Exemplaires found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ exemplaire }: IRootState) => ({
  exemplaireList: exemplaire.entities,
  loading: exemplaire.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Exemplaire);
