import {test as setup, expect} from '@playwright/test'
import { LoginPage } from "../pageobjects.ts/LoginPage"


setup('authentication as admi n', async ({page})=>{

    console.log ('Autenticacion iniciada usando el setup')
    //iniciar sesión

    const loginPage = new LoginPage(page)
       await loginPage.loginAsAdmin()

    //nos aseguramos que el inicio de seion es exitoso
    await expect (page.getByRole('link', {name: 'Admin'})).toBeVisible()
    //Una vez que la sesion incio sesion guardar el estado
    await page.context().storageState({path:'.auth/admin.json'})

    console.log('Autenticacion completa usando el setup')

})