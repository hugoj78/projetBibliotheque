import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmplacementComponentsPage from './emplacement.page-object';
import EmplacementUpdatePage from './emplacement-update.page-object';
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

describe('Emplacement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let emplacementComponentsPage: EmplacementComponentsPage;
  let emplacementUpdatePage: EmplacementUpdatePage;

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
    emplacementComponentsPage = new EmplacementComponentsPage();
    emplacementComponentsPage = await emplacementComponentsPage.goToPage(navBarPage);
  });

  it('should load Emplacements', async () => {
    expect(await emplacementComponentsPage.title.getText()).to.match(/Emplacements/);
    expect(await emplacementComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Emplacements', async () => {
    const beforeRecordsCount = (await isVisible(emplacementComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(emplacementComponentsPage.table);
    emplacementUpdatePage = await emplacementComponentsPage.goToCreateEmplacement();
    await emplacementUpdatePage.enterData();

    expect(await emplacementComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(emplacementComponentsPage.table);
    await waitUntilCount(emplacementComponentsPage.records, beforeRecordsCount + 1);
    expect(await emplacementComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await emplacementComponentsPage.deleteEmplacement();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(emplacementComponentsPage.records, beforeRecordsCount);
      expect(await emplacementComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(emplacementComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
