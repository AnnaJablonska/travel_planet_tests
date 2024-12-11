import { Locator, Page } from "@playwright/test";

export class BasePage{
private readonly page: Page;
public readonly locators: {
    cookieBanner: Locator;
    cookieBannerAllowAllButton: Locator;
    notificationAcceptButton: Locator;
    notificationIframeCancelButton: Locator;
    iframeLocator: Locator;
    

};

constructor(page: Page) {
    this.page = page;
    this.locators = this.initializeLocators();
};

private initializeLocators() {
    return {
         cookieBanner:  this.page.locator('#CybotCookiebotDialog'),
         cookieBannerAllowAllButton:  this.page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'),
         notificationAcceptButton:  this.page.locator('#accept-btn'),
         iframeLocator: this.page.locator('iframe[src*="push/popup_iframe.html"]'),
         notificationIframeCancelButton: this.page.frameLocator('iframe[src="https://yottlyscript.com/push/popup_iframe.html"]').locator('#cancel-btn'),
    }
}


async acceptCookieBannerIfVisible() {
  if (await this.locators.cookieBanner.isVisible()) {
    await this.locators.cookieBannerAllowAllButton.click();
  }
}

async cancelNotificationPopup() {
  if (await this.locators.iframeLocator.isVisible()) {
    const iframe = this.page.frameLocator('iframe[src*="push/popup_iframe.html"]');
    const cancelBtn = iframe.locator('button#cancel-btn');
    if (await cancelBtn.isVisible()) {
      await cancelBtn.click();
    } else {
      console.log('Cancel button is not visible');
    }
  } else {
    console.log('Iframe is not visible');
  }
}

}