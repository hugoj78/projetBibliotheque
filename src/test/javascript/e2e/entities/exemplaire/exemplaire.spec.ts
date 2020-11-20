import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ExemplaireComponentsPage from './exemplaire.page-object';
import ExemplaireUpdatePage from './exemplaire-update.page-object';
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

describe('Exemplaire e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let exemplaireComponentsPage: ExemplaireComponentsPage;
  let exemplaireUpdatePage: ExemplaireUpdatePage;

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
    exemplaireComponentsPage = new ExemplaireComponentsPage();
    exemplaireComponentsPage = await exemplaireComponentsPage.goToPage(navBarPage);
  });

  it('should load Exemplaires', async () => {
    expect(await exemplaireComponentsPage.title.getText()).to.match(/Exemplaires/);
    expect(await exemplaireComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Exemplaires', async () => {
    const beforeRecordsCount = (await isVisible(exemplaireComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(exemplaireComponentsPage.table);
    exemplaireUpdatePage = await exemplaireComponentsPage.goToCreateExemplaire();
    await exemplaireUpdatePage.enterData();

    expect(await exemplaireComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(exemplaireComponentsPage.table);
    await waitUntilCount(exemplaireComponentsPage.records, beforeRecordsCount + 1);
    expect(await exemplaireComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await exemplaireComponentsPage.deleteExemplaire();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(exemplaireComponentsPage.records, beforeRecordsCount);
      expect(await exemplaireComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(exemplaireComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
