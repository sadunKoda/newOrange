import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export type LoginCredentials = { username: string; password: string };

export class LoginPage extends BasePage {
  readonly path = '/web/index.php/auth/login';
  private usernameInput = this.page.locator('//input[@name="username"]');
  private passwordInput = this.page.locator('//input[@name="password"]');
  private loginButton = this.page.locator(
    "//button[@type='submit' and contains(@class,'orangehrm-login-button')]",
  );

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigates to the OrangeHRM login route and waits for the shell to load.
   * @returns this for chaining
   */
  async step_navigate(): Promise<this> {
    await this.page.goto(this.path);
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Fills credentials and submits the login form.
   * @param credentials - Username + password pair
   * @returns this for chaining
   */
  async step_login(credentials: LoginCredentials): Promise<this> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await Promise.all([
      this.page.waitForURL(/\/dashboard\/index(?:\?|$)/, { timeout: 25_000 }),
      this.loginButton.click(),
    ]);
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Verifies the login screen shows the expected shell before authentication.
   * @param labels - Expected copy keyed for lightweight assertions
   * @returns this for chaining
   */
  async verify_initialState(labels: { pageTitle: string }): Promise<this> {
    expect(await this.getTitle()).toContain(labels.pageTitle);
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    return this;
  }
}
