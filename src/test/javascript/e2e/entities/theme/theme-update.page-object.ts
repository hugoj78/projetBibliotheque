import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ThemeUpdatePage {
  pageTitle: ElementFinder = element(by.id('projetBibliothequeApp.theme.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idThemeInput: ElementFinder = element(by.css('input#theme-idTheme'));
  themeInput: ElementFinder = element(by.css('input#theme-theme'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdThemeInput(idTheme) {
    await this.idThemeInput.sendKeys(idTheme);
  }

  async getIdThemeInput() {
    return this.idThemeInput.getAttribute('value');
  }

  async setThemeInput(theme) {
    await this.themeInput.sendKeys(theme);
  }

  async getThemeInput() {
    return this.themeInput.getAttribute('value');
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
    await this.setIdThemeInput('64c99148-3908-465d-8c4a-e510e3ade974');
    expect(await this.getIdThemeInput()).to.match(/64c99148-3908-465d-8c4a-e510e3ade974/);
    await waitUntilDisplayed(this.saveButton);
    await this.setThemeInput('theme');
    expect(await this.getThemeInput()).to.match(/theme/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
