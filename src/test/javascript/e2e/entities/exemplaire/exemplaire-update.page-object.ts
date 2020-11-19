import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ExemplaireUpdatePage {
  pageTitle: ElementFinder = element(by.id('projetBibliothequeApp.exemplaire.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idExemplaireInput: ElementFinder = element(by.css('input#exemplaire-idExemplaire'));
  disponibiliteInput: ElementFinder = element(by.css('input#exemplaire-disponibilite'));
  idLivreInput: ElementFinder = element(by.css('input#exemplaire-idLivre'));
  livreSelect: ElementFinder = element(by.css('select#exemplaire-livre'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdExemplaireInput(idExemplaire) {
    await this.idExemplaireInput.sendKeys(idExemplaire);
  }

  async getIdExemplaireInput() {
    return this.idExemplaireInput.getAttribute('value');
  }

  getDisponibiliteInput() {
    return this.disponibiliteInput;
  }
  async setIdLivreInput(idLivre) {
    await this.idLivreInput.sendKeys(idLivre);
  }

  async getIdLivreInput() {
    return this.idLivreInput.getAttribute('value');
  }

  async livreSelectLastOption() {
    await this.livreSelect.all(by.tagName('option')).last().click();
  }

  async livreSelectOption(option) {
    await this.livreSelect.sendKeys(option);
  }

  getLivreSelect() {
    return this.livreSelect;
  }

  async getLivreSelectedOption() {
    return this.livreSelect.element(by.css('option:checked')).getText();
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
    await this.setIdExemplaireInput('64c99148-3908-465d-8c4a-e510e3ade974');
    expect(await this.getIdExemplaireInput()).to.match(/64c99148-3908-465d-8c4a-e510e3ade974/);
    await waitUntilDisplayed(this.saveButton);
    const selectedDisponibilite = await this.getDisponibiliteInput().isSelected();
    if (selectedDisponibilite) {
      await this.getDisponibiliteInput().click();
      expect(await this.getDisponibiliteInput().isSelected()).to.be.false;
    } else {
      await this.getDisponibiliteInput().click();
      expect(await this.getDisponibiliteInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setIdLivreInput('5');
    expect(await this.getIdLivreInput()).to.eq('5');
    await this.livreSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
