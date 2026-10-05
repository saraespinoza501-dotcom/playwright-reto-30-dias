import {expect, test} from "@playwright/test"
test('Get all the employee names registered', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole ('button', {name: 'Login'}).click()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()
    await page.getByRole("link", {name: 'Admin'}). click()
    await page.getByRole('navigation', {name: 'Topbar Menu'}). getByText('user Management').click()
    await page.getByRole('menuitem', {name: 'users'}).click()

    const rows = page.locator('.oxd-table-card .oxd-table-row')

    // Esperar a que el conteo de filas se estabilice (deje de crecer)
    let previousCount = -1;
    let currentCount = await rows.count();
    while (currentCount !== previousCount) {
        previousCount = currentCount;
        await page.waitForTimeout(500);
        currentCount = await rows.count();
    }
    const rowCount = currentCount;

    const employeeNames: string[] = []
    for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        await row.scrollIntoViewIfNeeded();

        const cell = row.locator('.oxd-table-cell').nth(3);
        const employeeName = await cell.textContent();

        if (employeeName) {
            employeeNames.push(employeeName);
        }
    }

console.log(employeeNames)
})
/*import {expect, test} from "@playwright/test"
test('Get all the usernames registered', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole ('button', {name: 'Login'}).click()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()
    await page.getByRole("link", {name: 'Admin'}). click()
    await page.getByRole('navigation', {name: 'Topbar Menu'}). getByText('user Management').click()
    await page.getByRole('menuitem', {name: 'users'}).click()
    // no uso el await porque estoy diciendo es que lo capture
    const rows = page.getByRole('table').getByRole('row')
    await expect(rows.last()).toBeVisible();
    const rowCount = await rows.count()

    const usernames: string [] = []

    for(let i = 1; i < rowCount; i++) {
        const cell = rows.nth(i).getByRole('cell').nth (3)
        const username = await cell.textContent()

        if(username) {
            usernames.push(username)
        }   
     }

console.log(usernames)
})*/
