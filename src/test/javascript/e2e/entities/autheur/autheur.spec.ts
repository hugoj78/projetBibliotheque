import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AutheurComponentsPage from './autheur.page-object';
import AutheurUpdatePage from './autheur-update.page-object';
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

describe('Autheur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let autheurComponentsPage: AutheurComponentsPage;
  let autheurUpdatePage: AutheurUpdatePage;

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
    autheurComponentsPage = new AutheurComponentsPage();
    autheurComponentsPage = await autheurComponentsPage.goToPage(navBarPage);
  });

  it('should load Autheurs', async () => {
    expect(await autheurComponentsPage.title.getText()).to.match(/Autheurs/);
    expect(await autheurComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Autheurs', async () => {
    const beforeRecordsCount = (await isVisible(autheurComponentsPage.noRecords)) ? 0 : await getRecordsCount(autheurComponentsPage.table);
    autheurUpdatePage = await autheurComponentsPage.goToCreateAutheur();
    await autheurUpdatePage.enterData();

    expect(await autheurComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(autheurComponentsPage.table);
    await waitUntilCount(autheurComponentsPage.records, beforeRecordsCount + 1);
    expect(await autheurComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await autheurComponentsPage.deleteAutheur();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(autheurComponentsPage.records, beforeRecordsCount);
      expect(await autheurComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(autheurComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
