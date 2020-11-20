import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LivreComponentsPage from './livre.page-object';
import LivreUpdatePage from './livre-update.page-object';
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

describe('Livre e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let livreComponentsPage: LivreComponentsPage;
  let livreUpdatePage: LivreUpdatePage;

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
    livreComponentsPage = new LivreComponentsPage();
    livreComponentsPage = await livreComponentsPage.goToPage(navBarPage);
  });

  it('should load Livres', async () => {
    expect(await livreComponentsPage.title.getText()).to.match(/Livres/);
    expect(await livreComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Livres', async () => {
    const beforeRecordsCount = (await isVisible(livreComponentsPage.noRecords)) ? 0 : await getRecordsCount(livreComponentsPage.table);
    livreUpdatePage = await livreComponentsPage.goToCreateLivre();
    await livreUpdatePage.enterData();

    expect(await livreComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(livreComponentsPage.table);
    await waitUntilCount(livreComponentsPage.records, beforeRecordsCount + 1);
    expect(await livreComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await livreComponentsPage.deleteLivre();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(livreComponentsPage.records, beforeRecordsCount);
      expect(await livreComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(livreComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
