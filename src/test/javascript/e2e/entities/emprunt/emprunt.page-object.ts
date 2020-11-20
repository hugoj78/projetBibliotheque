import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmpruntUpdatePage from './emprunt-update.page-object';

const expect = chai.expect;
export class EmpruntDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('projetBibliothequeApp.emprunt.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-emprunt'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmpruntComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('emprunt-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('emprunt');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmprunt() {
    await this.createButton.click();
    return new EmpruntUpdatePage();
  }

  async deleteEmprunt() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const empruntDeleteDialog = new EmpruntDeleteDialog();
    await waitUntilDisplayed(empruntDeleteDialog.deleteModal);
    expect(await empruntDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/projetBibliothequeApp.emprunt.delete.question/);
    await empruntDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(empruntDeleteDialog.deleteModal);

    expect(await isVisible(empruntDeleteDialog.deleteModal)).to.be.false;
  }
}
