import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly path = '/web/index.php/dashboard/index';
  private dashboardNavActive = this.page.locator(
    "//a[contains(@class,'oxd-main-menu-item') and contains(@class,'active') and normalize-space(.)='Dashboard']",
  );

  constructor(page: Page) {
    super(page);
  }

  /**
   * Waits until the dashboard route is active after authentication.
   * @returns this for chaining
   */
  async step_waitForLoaded(): Promise<this> {
    await this.page.waitForURL(/\/dashboard\/index(?:\?|$)/, { timeout: 25_000 });
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Verifies the user landed on the dashboard with the Dashboard menu selected.
   * @returns this for chaining
   */
  async verify_onDashboard(): Promise<this> {
    await expect(this.page).toHaveURL(/dashboard\/index/);
    await expect(this.dashboardNavActive).toBeVisible();
    return this;
  }

  /**
   * Verifies the browser tab title contains the expected product name.
   * @param expectedSubstring - Substring expected in document.title
   * @returns this for chaining
   */
  async verify_pageTitle(expectedSubstring: string): Promise<this> {
    expect(await this.getTitle()).toContain(expectedSubstring);
    return this;
  }
}
