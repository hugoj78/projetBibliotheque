import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmplacementUpdatePage from './emplacement-update.page-object';

const expect = chai.expect;
export class EmplacementDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('projetBibliothequeApp.emplacement.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-emplacement'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmplacementComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('emplacement-heading'));
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
    await navBarPage.getEntityPage('emplacement');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmplacement() {
    await this.createButton.click();
    return new EmplacementUpdatePage();
  }

  async deleteEmplacement() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const emplacementDeleteDialog = new EmplacementDeleteDialog();
    await waitUntilDisplayed(emplacementDeleteDialog.deleteModal);
    expect(await emplacementDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/projetBibliothequeApp.emplacement.delete.question/);
    await emplacementDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(emplacementDeleteDialog.deleteModal);

    expect(await isVisible(emplacementDeleteDialog.deleteModal)).to.be.false;
  }
}
