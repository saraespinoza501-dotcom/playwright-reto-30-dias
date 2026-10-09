import {expect, test} from "@playwright/test"
import { LoginPage } from "../pageobjects.ts/LoginPage"
import { SideMenuOption, SidePanel } from "../components/SidePanel"
test('Get all the employee names registered', async ({page}) => {
 
    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

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

test('Select specific user for edition', async ({page}) => {

    const userForEdition = 'abcda';
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin');
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible();
    await page.getByRole('link', {name: 'Admin'}).click();
    await page.getByRole('navigation', {name: 'Topbar Menu'}).getByText('user Management').click();
    await page.getByRole('menuitem', {name: 'users'}).click();

    const pencilToEdit = page
        .locator('.oxd-table-card .oxd-table-row')
        .filter({ hasText: userForEdition })
        .locator('button')
        .filter({ has: page.locator('i.bi-pencil-fill') });

    await pencilToEdit.click();

    await page.locator('.oxd-input').nth(1).click();
    const currentUsername = await page.locator('.oxd-input').nth(1).inputValue();

    expect(currentUsername).toEqual(userForEdition);
});

test('Check user role options', async({page}) =>{ 

  const expecteRoleOptions = ['-- Select --', 'Admin', 'ESS']


  const loginPage = new LoginPage(page)
  await loginPage.loginAsAdmin()

  const sidePanel = new SidePanel(page)
  await sidePanel.clickonOption(SideMenuOption.ADMIN)

  await page.locator ("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
  const currentUserRoleOptions =  await page.getByRole('listbox'). getByRole('option').allInnerTexts()

  console.log(currentUserRoleOptions)
  //Buena practica
  
  expect(currentUserRoleOptions,'the options displayed in the User Role Dropdown do not match the expected options.').toEqual(expecteRoleOptions)

 
})


test('Filter by user admin', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickonOption(SideMenuOption.ADMIN)

    // Filas del cuerpo de la tabla (un locator: no busca nada hasta que se usa)
    const allBodyRows = page
        .getByRole('table')
        .getByRole('rowgroup')
        .nth(1)
        .getByRole('row')

    // 1. Esperar a que la tabla se pinte antes de interactuar
    await expect(allBodyRows.first()).toBeVisible()

    // 2. Aplicar el filtro por User Role
    await page
        .locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div")
        .click()

    await page
        .getByRole('listbox')
        .getByRole('option', { name: 'Admin', exact: true })
        .click()

    await page.getByRole('button', { name: 'Search' }).click()

    // 3. Esperar a que la tabla se actualice: no debe quedar ninguna fila sin "Admin"
    const nonAdminRows = allBodyRows.filter({
        hasNot: page.getByRole('cell', { name: 'Admin', exact: true })
    })
    await expect(nonAdminRows).toHaveCount(0)

    // 4. La tabla no puede haber quedado vacía
    await expect(allBodyRows.first()).toBeVisible()

    // 5. El total que dice la página tras filtrar, por ejemplo "(47) Records Found"
    const recordsText = await page.getByText(/Records? Found/).innerText()
    const totalAdmins = Number(recordsText.match(/\d+/)![0])
    console.log('Admin users after filtering:', totalAdmins)

    // 6. Las filas mostradas deben coincidir con ese total
    await expect(allBodyRows).toHaveCount(totalAdmins)

    // 7. Comprobación estricta sobre la columna User Role (índice 2)
    const rowCount = await allBodyRows.count()
    for (let i = 0; i < rowCount; i++) {
        await expect(
            allBodyRows.nth(i).getByRole('cell').nth(2)
        ).toHaveText('Admin')
    }
})


/*test('Filter by user admin', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickonOption(SideMenuOption.ADMIN)

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')

    // Filas que contienen el role admin
    const currentAdminRows = allBodyRows.filter({
        has: page.getByRole('cell').nth(2).getByText('Admin')
    })

    const expectedAdminCount = await currentAdminRows.count()
    console.log('Admin users before filtering: ', expectedAdminCount)

    // Aplicar filtro
    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
    await page.getByRole('listbox').getByRole('option', { name: 'Admin' }).click()
    await page.getByRole('button', { name: 'Search' }).click()

    // La tabla filtrada debería tener exactamente la misma cantidad que encontramos
    await expect(allBodyRows).toHaveCount(expectedAdminCount)

    for (let i = 0; i < expectedAdminCount; i++) {
        await expect(allBodyRows.nth(i).getByRole('cell').nth(2)).toContainText('Admin')
    }
})*/



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
