import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class UtilisateurUpdatePage {
  pageTitle: ElementFinder = element(by.id('projetBibliothequeApp.utilisateur.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idUtilisateurInput: ElementFinder = element(by.css('input#utilisateur-idUtilisateur'));
  nomInput: ElementFinder = element(by.css('input#utilisateur-nom'));
  prenomInput: ElementFinder = element(by.css('input#utilisateur-prenom'));
  dateNaissanceInput: ElementFinder = element(by.css('input#utilisateur-dateNaissance'));
  roleInput: ElementFinder = element(by.css('input#utilisateur-role'));
  pseudoInput: ElementFinder = element(by.css('input#utilisateur-pseudo'));
  motDePasseInput: ElementFinder = element(by.css('input#utilisateur-motDePasse'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdUtilisateurInput(idUtilisateur) {
    await this.idUtilisateurInput.sendKeys(idUtilisateur);
  }

  async getIdUtilisateurInput() {
    return this.idUtilisateurInput.getAttribute('value');
  }

  async setNomInput(nom) {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput() {
    return this.nomInput.getAttribute('value');
  }

  async setPrenomInput(prenom) {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput() {
    return this.prenomInput.getAttribute('value');
  }

  async setDateNaissanceInput(dateNaissance) {
    await this.dateNaissanceInput.sendKeys(dateNaissance);
  }

  async getDateNaissanceInput() {
    return this.dateNaissanceInput.getAttribute('value');
  }

  async setRoleInput(role) {
    await this.roleInput.sendKeys(role);
  }

  async getRoleInput() {
    return this.roleInput.getAttribute('value');
  }

  async setPseudoInput(pseudo) {
    await this.pseudoInput.sendKeys(pseudo);
  }

  async getPseudoInput() {
    return this.pseudoInput.getAttribute('value');
  }

  async setMotDePasseInput(motDePasse) {
    await this.motDePasseInput.sendKeys(motDePasse);
  }

  async getMotDePasseInput() {
    return this.motDePasseInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setIdUtilisateurInput('64c99148-3908-465d-8c4a-e510e3ade974');
    expect(await this.getIdUtilisateurInput()).to.match(/64c99148-3908-465d-8c4a-e510e3ade974/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNomInput('nom');
    expect(await this.getNomInput()).to.match(/nom/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPrenomInput('prenom');
    expect(await this.getPrenomInput()).to.match(/prenom/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateNaissanceInput('01-01-2001');
    expect(await this.getDateNaissanceInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setRoleInput('role');
    expect(await this.getRoleInput()).to.match(/role/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPseudoInput('pseudo');
    expect(await this.getPseudoInput()).to.match(/pseudo/);
    await waitUntilDisplayed(this.saveButton);
    await this.setMotDePasseInput('motDePasse');
    expect(await this.getMotDePasseInput()).to.match(/motDePasse/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
