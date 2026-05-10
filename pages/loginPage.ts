import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly flashMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.flashMessage = page.locator('#flash');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifySuccessLogin() {
    await expect(this.page).toHaveURL(/secure/);
    await expect(this.flashMessage).toContainText(
      'You logged into a secure area!'
    );
  }

  async verifyFailedLogin(expectedMessage: string) {
    await expect(this.page).toHaveURL(/login/);
    await expect(this.flashMessage).toContainText(
      expectedMessage
    );
  }
}