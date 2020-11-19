import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './livre.reducer';
import { ILivre } from 'app/shared/model/livre.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILivreProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Livre = (props: ILivreProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { livreList, match, loading } = props;
  return (
    <div>
      <h2 id="livre-heading">
        Livres
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Livre
        </Link>
      </h2>
      <div className="table-responsive">
        {livreList && livreList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Id Livre</th>
                <th>Titre</th>
                <th>Description</th>
                <th>Isbn</th>
                <th>Code</th>
                <th>Emplacement</th>
                <th>Autheur</th>
                <th>Theme</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {livreList.map((livre, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${livre.id}`} color="link" size="sm">
                      {livre.id}
                    </Button>
                  </td>
                  <td>{livre.idLivre}</td>
                  <td>{livre.titre}</td>
                  <td>{livre.description}</td>
                  <td>{livre.isbn}</td>
                  <td>{livre.code}</td>
                  <td>
                    {livre.emplacement ? <Link to={`emplacement/${livre.emplacement.id}`}>{livre.emplacement.idEmplacement}</Link> : ''}
                  </td>
                  <td>{livre.autheur ? <Link to={`autheur/${livre.autheur.id}`}>{livre.autheur.idAutheur}</Link> : ''}</td>
                  <td>
                    {livre.themes
                      ? livre.themes.map((val, j) => (
                          <span key={j}>
                            <Link to={`theme/${val.id}`}>{val.idTheme}</Link>
                            {j === livre.themes.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${livre.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${livre.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${livre.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Livres found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ livre }: IRootState) => ({
  livreList: livre.entities,
  loading: livre.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Livre);
