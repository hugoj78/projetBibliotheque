import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './emprunt.reducer';
import { IEmprunt } from 'app/shared/model/emprunt.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmpruntDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmpruntDetail = (props: IEmpruntDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { empruntEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Emprunt [<b>{empruntEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idEmprunt">Id Emprunt</span>
          </dt>
          <dd>{empruntEntity.idEmprunt}</dd>
          <dt>
            <span id="dateEmprunt">Date Emprunt</span>
          </dt>
          <dd>
            {empruntEntity.dateEmprunt ? <TextFormat value={empruntEntity.dateEmprunt} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="idUtilisateur">Id Utilisateur</span>
          </dt>
          <dd>{empruntEntity.idUtilisateur}</dd>
          <dt>
            <span id="idExemplaire">Id Exemplaire</span>
          </dt>
          <dd>{empruntEntity.idExemplaire}</dd>
          <dt>Exemplaire</dt>
          <dd>{empruntEntity.exemplaire ? empruntEntity.exemplaire.idExemplaire : ''}</dd>
          <dt>Utilisateur</dt>
          <dd>{empruntEntity.utilisateur ? empruntEntity.utilisateur.idUtilisateur : ''}</dd>
        </dl>
        <Button tag={Link} to="/emprunt" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/emprunt/${empruntEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ emprunt }: IRootState) => ({
  empruntEntity: emprunt.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmpruntDetail);
