import { expect, test } from '@playwright/test';
import { seedAuthenticatedSession } from '../support/seed-session';

test.describe('application-services module', () => {
  test.beforeEach(async ({ page }) => {
    await seedAuthenticatedSession(page);
  });

  test('loads without a server error', async ({ page }) => {
    const response = await page.goto('/application-services');
    expect(response?.ok() ?? false).toBeTruthy();
  });
});
