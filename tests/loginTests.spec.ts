import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginModalWindow } from '../pages/LoginModalWindows';
import { BasePage } from '../pages/BasePage';

let homePage: HomePage, loginModalWindow: LoginModalWindow, basePage: BasePage;

const urls = [
  {
    url: 'https://www.travelplanet.pl/',
    name: 'TravelPlanet (PL)',
    validationMessage: 'Wypełniłeś formularz niepoprawnie. Spróbuj raz jeszcze.',
  },
  {
    url: 'https://www.invia.cz/',
    name: 'Invia (CZ)',
    validationMessage: 'Zadali jste nesprávné přihlašovací údaje. Prosím zkuste to znovu.',
  },
  {
    url: 'https://www.invia.sk/',
    name: 'Invia (SK)',
    validationMessage: 'Zadali ste nesprávne prihlasovací údaje. Skúste to prosím ešte raz.',
  },
  {
    url: 'https://www.invia.hu/',
    name: 'Invia (HU)',
    validationMessage: 'Hibás felhasznásználói adatokat adott meg. Kérjük próbálja meg újra.',
  },
];

for (const { url, name, validationMessage } of urls) {
test.describe(`Login tests on ${name}`, () => {

    test.beforeEach(async ({page}) => {
      homePage = new HomePage(page);
      basePage = new BasePage(page);
      loginModalWindow = new LoginModalWindow(page);
      await page.goto(url);
      await basePage.acceptCookieBannerIfVisible();
      await basePage.cancelNotificationPopup();
    });
    test.afterEach(async ({page}) => {
      await page.close();
    });
    test(`shouldn't login with invalid credentials on ${name}`, async () => {
      await test.step('Open login modal', async () => {
      await homePage.locators.loginButton.click();
      });
      await test.step('Fill login modal form', async () => {
      //Login credential should be keep in foe exampel .env file and not exposed in the code
      await loginModalWindow.fillLoginModal('email@test.com', 'Password123');
      });
      await test.step('Submit login credentials and check validation message', async () => {
        await loginModalWindow.locators.loginModalSubmitButton.click();
        await expect(loginModalWindow.locators.validationMessage).toHaveText(validationMessage);
        });
    });
  });
};