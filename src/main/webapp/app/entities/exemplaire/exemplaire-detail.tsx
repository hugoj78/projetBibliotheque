import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './exemplaire.reducer';
import { IExemplaire } from 'app/shared/model/exemplaire.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExemplaireDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ExemplaireDetail = (props: IExemplaireDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { exemplaireEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Exemplaire [<b>{exemplaireEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idExemplaire">Id Exemplaire</span>
          </dt>
          <dd>{exemplaireEntity.idExemplaire}</dd>
          <dt>
            <span id="disponibilite">Disponibilite</span>
          </dt>
          <dd>{exemplaireEntity.disponibilite ? 'true' : 'false'}</dd>
          <dt>
            <span id="idLivre">Id Livre</span>
          </dt>
          <dd>{exemplaireEntity.idLivre}</dd>
          <dt>Livre</dt>
          <dd>{exemplaireEntity.livre ? exemplaireEntity.livre.idLivre : ''}</dd>
        </dl>
        <Button tag={Link} to="/exemplaire" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/exemplaire/${exemplaireEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ exemplaire }: IRootState) => ({
  exemplaireEntity: exemplaire.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ExemplaireDetail);
