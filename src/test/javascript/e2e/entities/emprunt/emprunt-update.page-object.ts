import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmpruntUpdatePage {
  pageTitle: ElementFinder = element(by.id('projetBibliothequeApp.emprunt.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idEmpruntInput: ElementFinder = element(by.css('input#emprunt-idEmprunt'));
  dateEmpruntInput: ElementFinder = element(by.css('input#emprunt-dateEmprunt'));
  idUtilisateurInput: ElementFinder = element(by.css('input#emprunt-idUtilisateur'));
  idExemplaireInput: ElementFinder = element(by.css('input#emprunt-idExemplaire'));
  exemplaireSelect: ElementFinder = element(by.css('select#emprunt-exemplaire'));
  utilisateurSelect: ElementFinder = element(by.css('select#emprunt-utilisateur'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdEmpruntInput(idEmprunt) {
    await this.idEmpruntInput.sendKeys(idEmprunt);
  }

  async getIdEmpruntInput() {
    return this.idEmpruntInput.getAttribute('value');
  }

  async setDateEmpruntInput(dateEmprunt) {
    await this.dateEmpruntInput.sendKeys(dateEmprunt);
  }

  async getDateEmpruntInput() {
    return this.dateEmpruntInput.getAttribute('value');
  }

  async setIdUtilisateurInput(idUtilisateur) {
    await this.idUtilisateurInput.sendKeys(idUtilisateur);
  }

  async getIdUtilisateurInput() {
    return this.idUtilisateurInput.getAttribute('value');
  }

  async setIdExemplaireInput(idExemplaire) {
    await this.idExemplaireInput.sendKeys(idExemplaire);
  }

  async getIdExemplaireInput() {
    return this.idExemplaireInput.getAttribute('value');
  }

  async exemplaireSelectLastOption() {
    await this.exemplaireSelect.all(by.tagName('option')).last().click();
  }

  async exemplaireSelectOption(option) {
    await this.exemplaireSelect.sendKeys(option);
  }

  getExemplaireSelect() {
    return this.exemplaireSelect;
  }

  async getExemplaireSelectedOption() {
    return this.exemplaireSelect.element(by.css('option:checked')).getText();
  }

  async utilisateurSelectLastOption() {
    await this.utilisateurSelect.all(by.tagName('option')).last().click();
  }

  async utilisateurSelectOption(option) {
    await this.utilisateurSelect.sendKeys(option);
  }

  getUtilisateurSelect() {
    return this.utilisateurSelect;
  }

  async getUtilisateurSelectedOption() {
    return this.utilisateurSelect.element(by.css('option:checked')).getText();
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
    await this.setIdEmpruntInput('64c99148-3908-465d-8c4a-e510e3ade974');
    expect(await this.getIdEmpruntInput()).to.match(/64c99148-3908-465d-8c4a-e510e3ade974/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateEmpruntInput('01-01-2001');
    expect(await this.getDateEmpruntInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setIdUtilisateurInput('5');
    expect(await this.getIdUtilisateurInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setIdExemplaireInput('5');
    expect(await this.getIdExemplaireInput()).to.eq('5');
    await this.exemplaireSelectLastOption();
    await this.utilisateurSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
