import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const HomePage = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Row>
      <Col md="9">
        <h2>Bienvenue à la Bibliotheque</h2>
        <p className="lead">Pour vos emprunts de Livre :P</p>
        {account && account.login ? (
          <div>
            <Alert color="success">Vous etes connecté en tant que {account.login}.</Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              Si vous voulez
              <Link to="/login" className="alert-link">
                {' '}
                vous connecter
              </Link>
            </Alert>

            <Alert color="warning">
              Vous n&apos;avez toujours pas de compte ?&nbsp;
              <Link to="/account/register" className="alert-link">
                Créer un nouveau compte
              </Link>
            </Alert>

            <Alert color="success">
              Consulter les&nbsp;
              <Link to="/livres" className="alert-link">
                Livres
              </Link>
            </Alert>
          </div>
        )}    
      </Col>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(HomePage);
