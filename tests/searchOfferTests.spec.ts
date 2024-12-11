
import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { getDayString } from '../utils/utils';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { OfferDetailsPage } from '../pages/OfferDetailsPage';
import { BasePage } from '../pages/BasePage';

let homePage: HomePage, searchResultsPage: SearchResultsPage, offerDetailsPage: OfferDetailsPage, basePage: BasePage;

const startDay = getDayString(1);
const endDay = getDayString(8);
[
  {
    url: 'https://www.travelplanet.pl/',
    name: 'TravelPlanet (PL)',
    destination: 'Egipt',
    countryAlertMessage: 'Aktualne warunki podróży do Egiptu'
  },
  {
    url: 'https://www.invia.cz/',
    name: 'Invia (CZ)',
    destination: 'Egypt',
    countryAlertMessage: 'Aktuálně platné podmínky pro cesty do Egypta'
  },
  {
    url: 'https://www.invia.sk/',
    name: 'Invia (SK)',
    destination: 'Egypt',
    countryAlertMessage: 'Aktuálne platné podmienky pre cesty do Egypta',
  },
  {
    url: 'https://www.invia.hu/',
    name: 'Invia (HU)',
    destination: 'Egyiptom',
    countryAlertMessage: 'Aktuális beutazási feltételek Egyiptomba',
  },].forEach(({ url, name, destination, countryAlertMessage }) => {
test.describe('Travel testing',() => {
    test.beforeEach(async ({page}) => {
      homePage = new HomePage(page);
      basePage = new BasePage(page);
      searchResultsPage = new SearchResultsPage(page);
      offerDetailsPage = new OfferDetailsPage(page);
      await page.goto(url);

      await basePage.acceptCookieBannerIfVisible();
      await basePage.cancelNotificationPopup();
      await page.evaluate(() => {
        const popups = document.querySelectorAll('.CollapseCard, #CybotCookiebotDialog');
        popups.forEach(popup => popup.remove());
      });
    });

    test.afterEach(async ({page}) => {
      await page.close();
    });
    test(`Should be able to search and choose one offer on ${name}`, async ({page}) => {
      let offerTitle: string;
      await test.step('Fill form and trigger searching', async () => {
        await homePage.executeTravelSearch(startDay, endDay, destination);
        await expect(page.getByText(countryAlertMessage)).toBeVisible();
        await expect(searchResultsPage.locators.searchResultProduct.first()).toContainText(destination);
      });
      await test.step('Navigate to second page of search results', async () => {
        await searchResultsPage.clickNextPageAndVerifyPageNumber('2');
      });
      await test.step('Open selected offer', async () => {
        offerTitle = await searchResultsPage.locators.offerTitleLocator.first().textContent() as string;
        await searchResultsPage.selectAndOpenFirstOffer();
        await expect(offerDetailsPage.locators.offerTitleLocator).toHaveText(offerTitle!);
      });
      await test.step('Check offer details', async () => {
        await offerDetailsPage.validateOfferDetails(offerTitle!, destination);
        //For final test I would check more details and dates from order_container and not only
      });
    });
  });
});
