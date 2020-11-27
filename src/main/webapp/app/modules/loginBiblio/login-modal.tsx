import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  render() {
    const { loginError, handleClose } = this.props;

    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="login-page" autoFocus={false}>
        <AvForm onSubmit={this.handleSubmit}>
          <ModalHeader id="login-title" toggle={handleClose}>
            Connexion
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                {loginError ? (
                  <Alert color="danger">
                    <strong>Erreur de connexion !</strong> Vérifier vos credentials and réessayer s&apos;il vous plait.
                  </Alert>
                ) : null}
              </Col>
              <Col md="12">
                <AvField
                  name="username"
                  label="Utilisateur"
                  placeholder="Votre Utilisateur"
                  required
                  errorMessage="Utilisateur ne peut pas être vide"
                  autoFocus
                />
                <AvField
                  name="password"
                  type="password"
                  label="Mot de Passe"
                  placeholder="Ton mot de passe"
                  required
                  errorMessage="Ton mot de passe ne peut pas être vide"
                />
                <AvGroup check inline>
                  <Label className="form-check-label">
                    <AvInput type="checkbox" name="rememberMe" /> Se rappeler de moi
                  </Label>
                </AvGroup>
              </Col>
            </Row>
            <div className="mt-1">&nbsp;</div>
            <Alert color="warning">
              <Link to="/account/reset/request">Vous avez oublié votre mot de passe ?</Link>
            </Alert>
            <Alert color="warning">
              <span>Vous n&apos;avez pas de compte encore ?</span> <Link to="/account/register">Créer un nouveau compte</Link>
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose} tabIndex="1">
              Cancel
            </Button>{' '}
            <Button color="primary" type="submit">
              Sign in
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    );
  }
}

export default LoginModal;