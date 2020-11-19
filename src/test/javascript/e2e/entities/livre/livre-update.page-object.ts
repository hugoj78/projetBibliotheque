import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class LivreUpdatePage {
  pageTitle: ElementFinder = element(by.id('projetBibliothequeApp.livre.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idLivreInput: ElementFinder = element(by.css('input#livre-idLivre'));
  titreInput: ElementFinder = element(by.css('input#livre-titre'));
  descriptionInput: ElementFinder = element(by.css('input#livre-description'));
  isbnInput: ElementFinder = element(by.css('input#livre-isbn'));
  codeInput: ElementFinder = element(by.css('input#livre-code'));
  emplacementSelect: ElementFinder = element(by.css('select#livre-emplacement'));
  autheurSelect: ElementFinder = element(by.css('select#livre-autheur'));
  themeSelect: ElementFinder = element(by.css('select#livre-theme'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdLivreInput(idLivre) {
    await this.idLivreInput.sendKeys(idLivre);
  }

  async getIdLivreInput() {
    return this.idLivreInput.getAttribute('value');
  }

  async setTitreInput(titre) {
    await this.titreInput.sendKeys(titre);
  }

  async getTitreInput() {
    return this.titreInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setIsbnInput(isbn) {
    await this.isbnInput.sendKeys(isbn);
  }

  async getIsbnInput() {
    return this.isbnInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async emplacementSelectLastOption() {
    await this.emplacementSelect.all(by.tagName('option')).last().click();
  }

  async emplacementSelectOption(option) {
    await this.emplacementSelect.sendKeys(option);
  }

  getEmplacementSelect() {
    return this.emplacementSelect;
  }

  async getEmplacementSelectedOption() {
    return this.emplacementSelect.element(by.css('option:checked')).getText();
  }

  async autheurSelectLastOption() {
    await this.autheurSelect.all(by.tagName('option')).last().click();
  }

  async autheurSelectOption(option) {
    await this.autheurSelect.sendKeys(option);
  }

  getAutheurSelect() {
    return this.autheurSelect;
  }

  async getAutheurSelectedOption() {
    return this.autheurSelect.element(by.css('option:checked')).getText();
  }

  async themeSelectLastOption() {
    await this.themeSelect.all(by.tagName('option')).last().click();
  }

  async themeSelectOption(option) {
    await this.themeSelect.sendKeys(option);
  }

  getThemeSelect() {
    return this.themeSelect;
  }

  async getThemeSelectedOption() {
    return this.themeSelect.element(by.css('option:checked')).getText();
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
    await this.setIdLivreInput('64c99148-3908-465d-8c4a-e510e3ade974');
    expect(await this.getIdLivreInput()).to.match(/64c99148-3908-465d-8c4a-e510e3ade974/);
    await waitUntilDisplayed(this.saveButton);
    await this.setTitreInput('titre');
    expect(await this.getTitreInput()).to.match(/titre/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(this.saveButton);
    await this.setIsbnInput('isbn');
    expect(await this.getIsbnInput()).to.match(/isbn/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCodeInput('code');
    expect(await this.getCodeInput()).to.match(/code/);
    await this.emplacementSelectLastOption();
    await this.autheurSelectLastOption();
    // this.themeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
