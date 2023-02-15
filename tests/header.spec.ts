import { test, expect } from '@playwright/test';

test.describe('Header', () => {
  test('Header navigation', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.locator('main').getByText('Please search something...')
    ).toBeVisible();

    const nav = page.locator('nav');

    const search = nav.getByText('search');
    const history = nav.getByText('history');

    await expect(search).toBeVisible();
    await expect(history).toBeVisible();

    await history.click();

    const isHistoryUnderLine = await history.evaluate((e) => {
      return window.getComputedStyle(e).getPropertyValue('text-decoration');
    });

    expect(isHistoryUnderLine).toContain('underline');
    await expect(page).toMatchURL(new RegExp('history'));
    await expect(page.getByTestId('drawer')).toMatchText(
      'Please search something on search page!'
    );
  });

  test.only('Header menu navigation', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.locator('main').getByText('Please search something...')
    ).toBeVisible();

    const menu = page.locator('header').getByText('Menu');

    await menu.click();

    const popUpMenu = page.locator('ul[role="menu"]');

    await expect(popUpMenu).toBeVisible();

    await page
      .locator('header')
      .getByText('Github Search App')
      .click({ force: true });

    await expect(popUpMenu).toBeHidden();

    await menu.click();

    const search = popUpMenu.getByText('search');
    const history = popUpMenu.getByText('history');

    await expect(search).toBeVisible();
    await expect(history).toBeVisible();

    await history.click();

    const isHistoryUnderLine = await history.evaluate((e) => {
      return window.getComputedStyle(e).getPropertyValue('text-decoration');
    });

    expect(isHistoryUnderLine).toContain('underline');
    await expect(page).toMatchURL(new RegExp('history'));
    await expect(page.getByTestId('drawer')).toMatchText(
      'Please search something on search page!'
    );
  });
});
