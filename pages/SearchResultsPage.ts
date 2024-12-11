import { Locator, Page, expect } from "@playwright/test";

export class SearchResultsPage{

    private readonly page: Page;

    public readonly locators: {
        paginationNextPage: Locator;
        searchResultProduct: Locator;
        offerTitleLocator: Locator;
        currentPage: Locator;

    };

    constructor(page: Page) {
        this.page = page;
        this.locators = this.initializeLocators();
    }

    private initializeLocators() {
        return {
            paginationNextPage: this.page.locator('.pagination__link--next'),
            searchResultProduct: this.page.locator('[data-cy="b-product-list-2__inner"]'),
            offerTitleLocator : this.page.locator('.b-product-list-2__title h2'),
            currentPage: this.page.locator('.pagination__current'),
        }
    }

    public async selectAndOpenFirstOffer(){
        await this.page.locator('#search-form-result-boxes').first().click();
    }

    public async clickNextPageAndVerifyPageNumber(pageNumber: string){
        const isPaginationVisible = await this.locators.paginationNextPage.isVisible();

        if (isPaginationVisible) {
            await this.locators.paginationNextPage.click();
            await this.page.waitForLoadState('networkidle');
            await expect(this.locators.currentPage).toContainText(pageNumber);
        } else {
            console.log('Pagination is not available on this page.');
        }
    }
}