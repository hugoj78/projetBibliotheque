import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UtilisateurComponentsPage from './utilisateur.page-object';
import UtilisateurUpdatePage from './utilisateur-update.page-object';
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

describe('Utilisateur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let utilisateurComponentsPage: UtilisateurComponentsPage;
  let utilisateurUpdatePage: UtilisateurUpdatePage;

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
    utilisateurComponentsPage = new UtilisateurComponentsPage();
    utilisateurComponentsPage = await utilisateurComponentsPage.goToPage(navBarPage);
  });

  it('should load Utilisateurs', async () => {
    expect(await utilisateurComponentsPage.title.getText()).to.match(/Utilisateurs/);
    expect(await utilisateurComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Utilisateurs', async () => {
    const beforeRecordsCount = (await isVisible(utilisateurComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(utilisateurComponentsPage.table);
    utilisateurUpdatePage = await utilisateurComponentsPage.goToCreateUtilisateur();
    await utilisateurUpdatePage.enterData();

    expect(await utilisateurComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(utilisateurComponentsPage.table);
    await waitUntilCount(utilisateurComponentsPage.records, beforeRecordsCount + 1);
    expect(await utilisateurComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await utilisateurComponentsPage.deleteUtilisateur();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(utilisateurComponentsPage.records, beforeRecordsCount);
      expect(await utilisateurComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(utilisateurComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
