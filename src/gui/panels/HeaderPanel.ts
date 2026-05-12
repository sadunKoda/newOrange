import { Page, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class HeaderPanel extends BasePage {
  private upgradeLink = this.page.locator("//a[contains(@class,'orangehrm-upgrade-link')]");

  constructor(page: Page) {
    super(page);
  }

  /**
   * Focuses the promotional upgrade control in the top banner.
   * @returns this for chaining
   */
  async step_focusUpgradeLink(): Promise<this> {
    await this.upgradeLink.scrollIntoViewIfNeeded();
    return this;
  }

  /**
   * Verifies the upgrade promo link is visible on the authenticated shell.
   * @returns this for chaining
   */
  async verify_upgradeLinkVisible(): Promise<this> {
    await expect(this.upgradeLink).toBeVisible();
    return this;
  }
}
