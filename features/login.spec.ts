import { test } from '../src/config/page.config';
import { dashboardExpected, loginExpected as expected, users } from '../src/config/page-loader';

test.describe.serial('OrangeHRM demo - authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/web/index.php/auth/logout', { waitUntil: 'domcontentloaded', timeout: 25_000 });
  });

  test('should land on the dashboard after valid login', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.step_waitForLoaded();
    await dashboardPage.verify_onDashboard();
    await dashboardPage.verify_pageTitle(dashboardExpected.labels.pageTitle);
  });

  test('should render the login form before authenticating', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.verify_initialState(expected.labels);
    
  });
});
