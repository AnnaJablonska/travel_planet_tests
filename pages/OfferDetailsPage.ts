import { Locator, Page, expect } from "@playwright/test";

export class OfferDetailsPage{
    private readonly page: Page;
    public readonly locators: {
        offerTitleLocator: Locator;
        startDateInfo: Locator;
    };
    constructor(page: Page) {
        this.page = page;
        this.locators = this.initializeLocators();
    }
    private initializeLocators() {
        return {
            offerTitleLocator : this.page.locator('.b-product-detail__inline-title'),
            startDateInfo : this.page.locator('.b-summary-info__inner').first(),
        }
    }

    public async validateOfferDetails(offerTitle: string, destination: string) {
        await this.page.waitForSelector('.b-product-detail__inline-title', { state: 'visible' });
        await expect(this.locators.offerTitleLocator).toContainText(offerTitle!);
        await expect(this.page.getByRole('heading', { name: new RegExp(destination) })).toBeVisible();
        await this.page.waitForSelector('[data-cy="order-container"]', { state: 'visible' });
        await expect(this.page.locator('[data-cy="order-container"]')).toBeVisible();
    }


}