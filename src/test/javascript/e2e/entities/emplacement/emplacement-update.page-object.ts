import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmplacementUpdatePage {
  pageTitle: ElementFinder = element(by.id('projetBibliothequeApp.emplacement.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idEmplacementInput: ElementFinder = element(by.css('input#emplacement-idEmplacement'));
  nomEmplacementInput: ElementFinder = element(by.css('input#emplacement-nomEmplacement'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdEmplacementInput(idEmplacement) {
    await this.idEmplacementInput.sendKeys(idEmplacement);
  }

  async getIdEmplacementInput() {
    return this.idEmplacementInput.getAttribute('value');
  }

  async setNomEmplacementInput(nomEmplacement) {
    await this.nomEmplacementInput.sendKeys(nomEmplacement);
  }

  async getNomEmplacementInput() {
    return this.nomEmplacementInput.getAttribute('value');
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
    await this.setIdEmplacementInput('64c99148-3908-465d-8c4a-e510e3ade974');
    expect(await this.getIdEmplacementInput()).to.match(/64c99148-3908-465d-8c4a-e510e3ade974/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNomEmplacementInput('nomEmplacement');
    expect(await this.getNomEmplacementInput()).to.match(/nomEmplacement/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
