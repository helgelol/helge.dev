import { test, expect, chromium } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev.kubes.no/');
});

test('Should have correct title', async ({ page }) => {
  await expect(page).toHaveTitle('KUBES');
});

test('Should use UTF-8', async ({ page }) => {
  const metaDescription = page.locator('meta[charset="UTF-8"]');
  await expect(metaDescription).toHaveAttribute('charset', 'UTF-8');
});

test('Should contain name', async ({ page }) => {
  await page.getByRole('heading', { name: 'Helge Falch' });
});

test('Should contain title', async ({ page }) => {
  await page.getByText('System Developer');
});

test('Contact form works', async ({ page }) => {
  await page.getByRole('button', { name: 'Contact' }).click();
  await page.getByRole('button', { name: 'Send' }).click();
});
