import { test, expect } from '@playwright/test';

test('Main Page', async ({ page }) => {
	await page.goto('http://localhost:4173');
	await expect(page).toHaveTitle('helge - main');
	await page.getByRole('heading', { name: 'Helge Falch' });
	await page.getByRole('heading', { name: 'Software Developer' });
	await page.getByRole('button');
	await page.locator('#clipboard');
	await page.getByRole('button', { name: 'Send Email' });
});

test('Projects Page', async ({ page }) => {
	await page.goto('http://localhost:4173/projects');
	await expect(page).toHaveTitle('helge - projects');
	await page.getByRole('heading', { name: 'Projects' });
	await page.getByRole('link', { name: 'Project url ->' }).first();
});

test('About Page', async ({ page }) => {
	await page.goto('http://localhost:4173/about');
	await expect(page).toHaveTitle('helge - about');
	await page.getByRole('heading', { name: 'About' });
	await page.getByRole('heading', { name: 'Skills' });
	await page.getByRole('heading', { name: 'other:' });
});
test('Blog Page', async ({ page }) => {
	await page.goto('http://localhost:4173/blog');
	await expect(page).toHaveTitle('helge - blog');
	await page.getByRole('heading', { name: 'Articles' });
});
