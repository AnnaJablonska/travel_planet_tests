import {Locator, Page} from '@playwright/test';

export class LoginModalWindow{
    private readonly page: Page;
    public readonly locators: {
        loginModal: Locator;
        loginModalCloseButton: Locator;
        loginModalEmailInput: Locator;
        loginModalPasswordInput: Locator;
        loginModalSubmitButton: Locator;
        validationMessage: Locator;
      }
    constructor(page: Page) {
        this.page = page;
        this.locators = this.initializeLocators();
    };

    private initializeLocators() {
        return {
            loginModal: this.page.locator('[data-cy="login-modal"]'),
            loginModalCloseButton: this.page.locator('[data-cy="login-modal-close-button"]'),
            loginModalEmailInput: this.page.locator('#login_email'),
            loginModalPasswordInput: this.page.locator('#login_password'),
            loginModalSubmitButton: this.page.locator('[data-cy="login-form-submit"]'),
            validationMessage: this.page.locator('.message--error'),
        }
    };

    public async fillLoginModal(email: string, password: string) {
        await this.locators.loginModalEmailInput.fill(email);
        await this.locators.loginModalPasswordInput.fill(password);
    };
};