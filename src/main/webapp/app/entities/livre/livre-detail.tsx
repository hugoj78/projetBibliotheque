import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './livre.reducer';
import { ILivre } from 'app/shared/model/livre.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILivreDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LivreDetail = (props: ILivreDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { livreEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Livre [<b>{livreEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idLivre">Id Livre</span>
          </dt>
          <dd>{livreEntity.idLivre}</dd>
          <dt>
            <span id="titre">Titre</span>
          </dt>
          <dd>{livreEntity.titre}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{livreEntity.description}</dd>
          <dt>
            <span id="isbn">Isbn</span>
          </dt>
          <dd>{livreEntity.isbn}</dd>
          <dt>
            <span id="code">Code</span>
          </dt>
          <dd>{livreEntity.code}</dd>
          <dt>Emplacement</dt>
          <dd>{livreEntity.emplacement ? livreEntity.emplacement.idEmplacement : ''}</dd>
          <dt>Autheur</dt>
          <dd>{livreEntity.autheur ? livreEntity.autheur.idAutheur : ''}</dd>
          <dt>Theme</dt>
          <dd>
            {livreEntity.themes
              ? livreEntity.themes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.idTheme}</a>
                    {livreEntity.themes && i === livreEntity.themes.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/livre" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/livre/${livreEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ livre }: IRootState) => ({
  livreEntity: livre.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LivreDetail);
