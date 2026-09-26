import { test, expect } from '@playwright/test';

//
test('verify hyperlink', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/status_codes');

    await page.getByRole('link', { name: '200' }).click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes/200');

    await page.goBack();

    await page.getByRole('link', { name: '301' }).click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes/301');
    await page.goBack();

    await page.getByRole('link', { name: '404' }).click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes/404');
    await page.goBack();
    
    await page.getByRole('link', { name: '500' }).click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes/500');
    await page.goBack();
})