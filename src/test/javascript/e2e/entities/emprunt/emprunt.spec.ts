import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmpruntComponentsPage from './emprunt.page-object';
import EmpruntUpdatePage from './emprunt-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Emprunt e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let empruntComponentsPage: EmpruntComponentsPage;
  let empruntUpdatePage: EmpruntUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    empruntComponentsPage = new EmpruntComponentsPage();
    empruntComponentsPage = await empruntComponentsPage.goToPage(navBarPage);
  });

  it('should load Emprunts', async () => {
    expect(await empruntComponentsPage.title.getText()).to.match(/Emprunts/);
    expect(await empruntComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Emprunts', async () => {
    const beforeRecordsCount = (await isVisible(empruntComponentsPage.noRecords)) ? 0 : await getRecordsCount(empruntComponentsPage.table);
    empruntUpdatePage = await empruntComponentsPage.goToCreateEmprunt();
    await empruntUpdatePage.enterData();

    expect(await empruntComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(empruntComponentsPage.table);
    await waitUntilCount(empruntComponentsPage.records, beforeRecordsCount + 1);
    expect(await empruntComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await empruntComponentsPage.deleteEmprunt();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(empruntComponentsPage.records, beforeRecordsCount);
      expect(await empruntComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(empruntComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
