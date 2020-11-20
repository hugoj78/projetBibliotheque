import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './autheur.reducer';
import { IAutheur } from 'app/shared/model/autheur.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAutheurDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AutheurDetail = (props: IAutheurDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { autheurEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Autheur [<b>{autheurEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idAutheur">Id Autheur</span>
          </dt>
          <dd>{autheurEntity.idAutheur}</dd>
          <dt>
            <span id="autheur">Autheur</span>
          </dt>
          <dd>{autheurEntity.autheur}</dd>
        </dl>
        <Button tag={Link} to="/autheur" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/autheur/${autheurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ autheur }: IRootState) => ({
  autheurEntity: autheur.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AutheurDetail);
