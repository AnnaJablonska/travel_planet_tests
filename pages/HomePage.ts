import {Locator, Page} from '@playwright/test';


export class HomePage{
    private readonly page: Page;
    public readonly locators: {
        destinationPicker: Locator;
        datePicker: Locator;
        submitDestinationButton: Locator;
        calendar: Locator;
        submitDatepickerButton: Locator;
        transportPicker: Locator;
        adultsAmountPicker: Locator;
        childrenAmountPicker: Locator;
        searchButton: Locator;
        loginButton: Locator;
        menuHeader: Locator;
        mainMenu: Locator;
        mainSearchContainer: Locator;
      };

constructor(page: Page) {
    this.page = page;
    this.locators = this.initializeLocators();
}

private initializeLocators() {
    return {
        destinationPicker: this.page.locator('input[name="destination_picker"]'),
        submitDestinationButton: this.page.locator('[data-cy="sf-destination-picker-popup-save-button"]'),
        datePicker: this.page.locator('[data-cy="sf-datepicker-textbox"]'),
        calendar : this.page.locator('[data-cy="sf-datepicker-textbox"]'),
        submitDatepickerButton: this.page.locator('[data-cy="sf-datepicker-popup-save-button"]'),
        transportPicker: this.page.locator('[data-cy="person-textbox-control-adults"]'),
        adultsAmountPicker: this.page.locator('[data-cy="person-textbox-control-adults"]'),
        childrenAmountPicker: this.page.locator('[data-cy="person-textbox-control-children"]'),
        searchButton: this.page.locator('[data-cy="sf-submit-button"]'),
        loginButton: this.page.locator('[data-cy="header-user-box-toggle-button"]'),
        menuHeader: this.page.locator('[data-cy="header-top-menu"]'),
        mainMenu: this.page.locator('[data-cy="menu-main"]'),
        mainSearchContainer: this.page.locator('[data-cy="main-search-form-container"]'),
    }
}



public async executeTravelSearch(startDay:string, endDay: string, destination: string) {
    await this.locators.destinationPicker.click();
    await this.page.getByRole('checkbox', { name: destination }).check();
    await this.locators.submitDestinationButton.click();
    await this.locators.calendar.click();
    await this.page.waitForSelector('.i-calendar__day-cell', { state: 'visible' });
    await this.page.getByLabel(startDay).first().click({force: true});
    await this.page.getByLabel(endDay).first().click({force: true});
    await this.locators.submitDatepickerButton.click();
    await this.locators.searchButton.click();
};
}