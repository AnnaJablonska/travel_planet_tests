import { BasePage } from "../pages/BasePage";
import { HomePage } from "../pages/HomePage";
import {test, expect} from '@playwright/test';

let homePage: HomePage, basePage: BasePage;

[
    {
      url: 'https://www.travelplanet.pl/',
      name: 'TravelPlanet (PL)',
    },
    {
      url: 'https://www.invia.cz/',
      name: 'Invia (CZ)',
    },
    {
      url: 'https://www.invia.sk/',
      name: 'Invia (SK)',
    },
    {
      url: 'https://www.invia.hu/',
      name: 'Invia (HU)',
    },].forEach(({ url, name}) => {
  test.describe('Home Page elements visibility',() => {
      test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        basePage = new BasePage(page);
        await page.goto(url);
      await basePage.acceptCookieBannerIfVisible();
      await basePage.cancelNotificationPopup();
      });

    test.afterEach(async ({page}) => {
      await page.close();
    });
      test(`Check main elements visibility on Home Page for "${name}"`, async () => {
        await expect(homePage.locators.menuHeader).toBeVisible();
        await expect(homePage.locators.mainMenu).toBeVisible();
        await expect(homePage.locators.mainSearchContainer).toBeVisible();
        await expect(homePage.locators.destinationPicker).toBeVisible();
        await expect(homePage.locators.datePicker).toBeVisible();
        await expect(homePage.locators.transportPicker).toBeVisible();
        await expect(homePage.locators.adultsAmountPicker).toBeVisible();
        await expect(homePage.locators.childrenAmountPicker).toBeVisible();
        await expect(homePage.locators.searchButton).toBeVisible();
        await expect(homePage.locators.loginButton).toBeVisible();
      });
    });
  });