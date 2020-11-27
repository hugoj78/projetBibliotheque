import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';

export type IRegisterProps = DispatchProps;

export const RegisterPage = (props: IRegisterProps) => {
  const [password, setPassword] = useState('');

  useEffect(
    () => () => {
      props.reset();
    },
    []
  );

  const handleValidSubmit = (event, values) => {
    props.handleRegister(values.username, values.email, values.firstPassword);
    event.preventDefault();
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title">Création Compte</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <AvForm id="register-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="username"
              label="Utilisateur"
              placeholder={'Votre utilisateur'}
              validate={{
                required: { value: true, errorMessage: 'Votre utilisateur est requis.' },
                pattern: {
                  value: '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$',
                  errorMessage: 'Votre utilisateur est invalide.',
                },
                minLength: { value: 1, errorMessage: 'Votre utilisateur doit faire au moins 1 caractère.' },
                maxLength: { value: 50, errorMessage: 'Votre utilisateur ne doit pas faire plus de 50 caractères.' },
              }}
            />
            <AvField
              name="email"
              label="Email"
              placeholder={'Votre email'}
              type="email"
              validate={{
                required: { value: true, errorMessage: 'Votre email est requis.' },
                minLength: { value: 5, errorMessage: 'Votre email doit faire au moins 5 caractères.' },
                maxLength: { value: 254, errorMessage: 'Votre email ne doit pas faire plus de 254 caractères.' },
              }}
            />
            <AvField
              name="firstPassword"
              label="Nouveau Mot de Passe"
              placeholder={'Nouveau Mot de Passe'}
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, errorMessage: 'Votre Mot de Passe est requis.' },
                minLength: { value: 4, errorMessage: 'Yotre Mot de Passe doit faire au moins 4 caractères.' },
                maxLength: { value: 50, errorMessage: 'Votre Mot de Passe ne doit pas faire plus de 50 caractères.' },
              }}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="secondPassword"
              label="Confirmer votre mot de passe"
              placeholder="Confirmer votre mot de passe"
              type="password"
              validate={{
                required: { value: true, errorMessage: 'Votre Mot de Passe de confirmation est requis.' },
                minLength: { value: 4, errorMessage: 'Yotre Mot de Passe de confirmation doit faire au moins 4 caractères.' },
                maxLength: { value: 50, errorMessage: 'Votre Mot de Passe de confirmation ne doit pas faire plus de 50 caractères.' },
                match: { value: 'firstPassword', errorMessage: 'Les mots de passe ne match pas !' },
              }}
            />
            <Button id="register-submit" color="primary" type="submit">
              S&apos;inscrire
            </Button>
          </AvForm>
          <p>&nbsp;</p>
          <Alert color="warning">
              Si vous voulez
              <Link to="/login" className="alert-link">
                {' '}
                vous connecter
              </Link>
            </Alert>
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = { handleRegister, reset };
type DispatchProps = typeof mapDispatchToProps;

export default connect(null, mapDispatchToProps)(RegisterPage);
