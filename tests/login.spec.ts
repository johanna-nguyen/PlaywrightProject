import {test, expect} from '@playwright/test';

// TC01: Form Authentication : Login successful with valid credentials
test('login successful', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
  await expect(page.getByRole('heading', { name: 'Secure Area', exact: true })).toBeVisible();
  await expect(page.getByText('You logged into a secure area!')).toBeVisible();
})

// TC02: Form Authentication : Login failed with wrong username
test ('login failed with wrong username', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmitH');
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Your username is invalid!')).toBeVisible();
})

// TC03: Form Authentication : Login failed with wrong password 
test ('login failed with wrong password', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');    
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Your password is invalid!')).toBeVisible();
})


// TC04: Form Authentication : Login failed with empty username
test ('login failed with empty username', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');    
    await page.getByRole('textbox', { name: 'Username' }).fill('');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
})

// TC05: Form Authentication : Login failed with empty password
test ('login failed with empty password', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Your password is invalid!')).toBeVisible();
})

