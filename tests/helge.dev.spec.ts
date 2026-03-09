import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
	test('has correct title and headings', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle('helge - main');
		await expect(page.getByRole('heading', { name: 'Helge Falch' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Software Developer' })).toBeVisible();
	});

	test('GitHub link points to correct URL', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
			'href',
			'https://github.com/helgelol'
		);
	});

	test('LinkedIn link points to correct URL', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('link', { name: 'Linkedin' })).toHaveAttribute(
			'href',
			'https://www.linkedin.com/in/helgelol/'
		);
	});

	test('email icon opens modal with email address', async ({ page }) => {
		await page.goto('/');
		await page.locator('.icons [role="button"]').click();
		await expect(page.locator('.modal')).toBeVisible();
		await expect(page.getByText('helge.falch@gmail.com')).toBeVisible();
	});

	test('modal closes when clicking backdrop', async ({ page }) => {
		await page.goto('/');
		await page.locator('.icons [role="button"]').click();
		await expect(page.locator('.modal')).toBeVisible();
		// content-wrapper is centered; click the top-left corner which is outside it
		await page.mouse.click(5, 5);
		await expect(page.locator('.modal')).not.toBeVisible();
	});

	test('modal copy button is visible', async ({ page }) => {
		await page.goto('/');
		await page.locator('.icons [role="button"]').click();
		// #clipboard sits inside a small tooltip-container; check it's in the DOM
		await expect(page.locator('#clipboard')).toBeAttached();
	});

	test('send email button is visible in modal', async ({ page }) => {
		await page.goto('/');
		await page.locator('.icons [role="button"]').click();
		await expect(page.getByRole('button', { name: 'Send Email' })).toBeVisible();
	});
});

test.describe('Navigation', () => {
	test('nav links navigate to the correct pages', async ({ page }) => {
		await page.goto('/');

		await page.locator('.buttons').getByRole('link', { name: 'Projects' }).click();
		await expect(page).toHaveURL('/projects');
		await expect(page).toHaveTitle('helge - projects');

		await page.locator('.buttons').getByRole('link', { name: 'About' }).click();
		await expect(page).toHaveURL('/about');
		await expect(page).toHaveTitle('helge - about');

		await page.locator('.buttons').getByRole('link', { name: 'Blog' }).click();
		await expect(page).toHaveURL('/blog');
		await expect(page).toHaveTitle('helge - blog');

		await page.locator('.buttons').getByRole('link', { name: 'Home' }).click();
		await expect(page).toHaveURL('/');
		await expect(page).toHaveTitle('helge - main');
	});

	test('active nav link has selected class', async ({ page }) => {
		await page.goto('/projects');
		// scope to .innerContainer to avoid matching .responsiveButtons which also has .buttons
		await expect(page.locator('.innerContainer .button.selected')).toHaveText('Projects');
	});
});

test.describe('Hamburger menu', () => {
	test.use({ viewport: { width: 600, height: 800 } });

	test('hamburger is visible and desktop nav is hidden', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('button', { name: 'menu-burger-button' })).toBeVisible();
		await expect(page.locator('.buttons').first()).not.toBeVisible();
	});

	test('hamburger opens nav links', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'menu-burger-button' }).click();
		await expect(page.locator('.responsiveButtons .button').first()).toBeVisible();
	});

	test('clicking a nav link in the hamburger menu closes it', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'menu-burger-button' }).click();
		await page.locator('.responsiveButtons').getByRole('link', { name: 'Projects' }).click();
		await expect(page).toHaveURL('/projects');
		await expect(page.locator('.NavBar')).not.toHaveClass(/open/);
	});
});

test.describe('Projects Page', () => {
	test('has correct title and content', async ({ page }) => {
		await page.goto('/projects');
		await expect(page).toHaveTitle('helge - projects');
		await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Project url ->' }).first()).toBeVisible();
	});
});

test.describe('About Page', () => {
	test('has correct title and content', async ({ page }) => {
		await page.goto('/about');
		await expect(page).toHaveTitle('helge - about');
		await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Skills' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'other:' })).toBeAttached();
	});
});

test.describe('Blog Page', () => {
	test('has correct title and articles heading', async ({ page }) => {
		await page.goto('/blog');
		await expect(page).toHaveTitle('helge - blog');
		await expect(page.getByRole('heading', { name: 'Articles' })).toBeVisible();
	});

	test('shows articles or empty state after loading', async ({ page }) => {
		await page.goto('/blog');
		await expect(
			page.locator('.article').first().or(page.getByText('No Articles yet.'))
		).toBeVisible({ timeout: 10000 });
	});
});

test.describe('Footer', () => {
	for (const path of ['/', '/projects', '/about', '/blog']) {
		test(`is visible on ${path}`, async ({ page }) => {
			await page.goto(path);
			await expect(page.getByRole('link', { name: 'solidjs' })).toBeVisible();
		});
	}
});
