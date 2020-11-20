import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AutheurUpdatePage from './autheur-update.page-object';

const expect = chai.expect;
export class AutheurDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('projetBibliothequeApp.autheur.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-autheur'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AutheurComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('autheur-heading'));
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
    await navBarPage.getEntityPage('autheur');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAutheur() {
    await this.createButton.click();
    return new AutheurUpdatePage();
  }

  async deleteAutheur() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const autheurDeleteDialog = new AutheurDeleteDialog();
    await waitUntilDisplayed(autheurDeleteDialog.deleteModal);
    expect(await autheurDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/projetBibliothequeApp.autheur.delete.question/);
    await autheurDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(autheurDeleteDialog.deleteModal);

    expect(await isVisible(autheurDeleteDialog.deleteModal)).to.be.false;
  }
}
