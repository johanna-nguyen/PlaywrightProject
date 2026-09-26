import{test, expect} from '@playwright/test';

// TC01: Table : Verify that the correct person is displayed with the maximum due amount
test('verify max due person name in table data', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');

   const dueAmounts = await page.$$eval('#table1 tbody tr td:nth-child(4)', tds => tds.map(td => parseFloat(td.textContent?.replace('$', '') || '0')));
   const maxDueAmount = Math.max(...dueAmounts);
   const maxDueIndexes = dueAmounts
       .map((amount, index) => amount === maxDueAmount ? index : -1)
       .filter(index => index !== -1);
   const maxDuePersonNames = await Promise.all(maxDueIndexes.map(index =>
       page.$eval(`#table1 tbody tr:nth-child(${index + 1})`, row => {
           const lastName = row.querySelector('td:nth-child(1)')?.textContent?.trim();
           const firstName = row.querySelector('td:nth-child(2)')?.textContent?.trim();
           return `${firstName} ${lastName}`;
       })
   ));
   await expect(maxDuePersonNames).toContain('Jason Doe');
});