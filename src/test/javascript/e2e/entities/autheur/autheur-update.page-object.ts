import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AutheurUpdatePage {
  pageTitle: ElementFinder = element(by.id('projetBibliothequeApp.autheur.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idAutheurInput: ElementFinder = element(by.css('input#autheur-idAutheur'));
  autheurInput: ElementFinder = element(by.css('input#autheur-autheur'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdAutheurInput(idAutheur) {
    await this.idAutheurInput.sendKeys(idAutheur);
  }

  async getIdAutheurInput() {
    return this.idAutheurInput.getAttribute('value');
  }

  async setAutheurInput(autheur) {
    await this.autheurInput.sendKeys(autheur);
  }

  async getAutheurInput() {
    return this.autheurInput.getAttribute('value');
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
    await this.setIdAutheurInput('64c99148-3908-465d-8c4a-e510e3ade974');
    expect(await this.getIdAutheurInput()).to.match(/64c99148-3908-465d-8c4a-e510e3ade974/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAutheurInput('autheur');
    expect(await this.getAutheurInput()).to.match(/autheur/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
