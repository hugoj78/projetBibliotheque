import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './emplacement.reducer';
import { IEmplacement } from 'app/shared/model/emplacement.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmplacementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmplacementDetail = (props: IEmplacementDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { emplacementEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Emplacement [<b>{emplacementEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idEmplacement">Id Emplacement</span>
          </dt>
          <dd>{emplacementEntity.idEmplacement}</dd>
          <dt>
            <span id="nomEmplacement">Nom Emplacement</span>
          </dt>
          <dd>{emplacementEntity.nomEmplacement}</dd>
        </dl>
        <Button tag={Link} to="/emplacement" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/emplacement/${emplacementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ emplacement }: IRootState) => ({
  emplacementEntity: emplacement.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmplacementDetail);
