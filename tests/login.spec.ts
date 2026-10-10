import { expect, test } from '@playwright/test'
import { LoginPage } from "../pageobjects.ts/LoginPage"
import { SideMenuOption, SidePanel } from '../components/SidePanel'

test.describe('con sesión iniciada', () => {

  test('login to hrm', async ({ page }) => {
    await page.goto("/web/index.php/admin/viewSystemUsers")

    const sidePanel = new SidePanel(page)
    await sidePanel.clickonOption(SideMenuOption.ADMIN)
    await sidePanel.clickonOption(SideMenuOption.LEAVE)
    await sidePanel.clickonOption(SideMenuOption.MAINTENANCE)
  })

})

test.describe('login negativo (sin sesión)', () => {

  // Esta línea hace que los tests de este grupo empiecen sin sesión
  test.use({ storageState: { cookies: [], origins: [] } })

  test('login password invalido', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto("/web/index.php/auth/login")
    await loginPage.doLogin('Admin', 'admin124')

    // aserción: validar que el mensaje de error aparece
    await expect(page.getByText('Invalid credentials')).toBeVisible()
  })

})


/*import {expect,test} from '@playwright/test'
import { LoginPage } from "../pageobjects.ts/LoginPage"
import { SideMenuOption, SidePanel } from '../components/SidePanel'*/




//test.describe('login casos positivos y negativos', () => {

   /* test('login to hrm', async({page}) => {
      /* const loginPage = new LoginPage(page)
       await loginPage.loginAsAdmin()*/
       //await loginPage.doLogin('Admin', 'admin123')*/
     /*  await page.goto("/web/index.php/admin/viewSystemUsers")

       const sidePanel = new SidePanel (page)
       await sidePanel.clickonOption(SideMenuOption.ADMIN)
       await sidePanel.clickonOption(SideMenuOption.LEAVE)
       await sidePanel.clickonOption(SideMenuOption.MAINTENANCE)

})
    test('login password invalido', async({page}) => {
     /* const loginPage = new LoginPage(page)
      await loginPage.doLogin('Admin', 'admin124')*/
/*await page.goto("/web/index.php/admin/viewSystemUsers")


    // para hacer una asercion, es decir validar que algo esta alli

  await expect(page.getByText('Invalid credentials')).toBeVisible()


})

})*/