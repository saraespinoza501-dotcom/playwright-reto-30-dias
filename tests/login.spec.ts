import {expect,test} from '@playwright/test'
import { LoginPage } from "../pageobjects.ts/LoginPage"
import { SideMenuOption, SidePanel } from '../components/SidePanel'




test.describe('login casos positivos y negativos', () => {

    test('login to hrm', async({page}) => {
       const loginPage = new LoginPage(page)
       await loginPage.loginAsAdmin()
       //await loginPage.doLogin('Admin', 'admin123')

       const sidePanel = new SidePanel (page)
       await sidePanel.clickonOption(SideMenuOption.ADMIN)
       await sidePanel.clickonOption(SideMenuOption.LEAVE)
       await sidePanel.clickonOption(SideMenuOption.MAINTENANCE)

})
    test('login password invalido', async({page}) => {
      const loginPage = new LoginPage(page)
      await loginPage.doLogin('Admin', 'admin124')



    // para hacer una asercion, es decir validar que algo esta alli

  await expect(page.getByText('Invalid credentials')).toBeVisible()


})

})