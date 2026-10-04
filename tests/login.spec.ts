import {expect,test} from '@playwright/test'

test.describe('login casos positivos y negativos', () => {

    test('login to hrm', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole ('button', {name: 'Login'}).click()

    // para hacer una asercion, es decir validar que algo esta alli

   await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()



})
    test('login password invalido', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('12n6')
    await page.getByRole ('button', {name: 'Login'}).click()

    // para hacer una asercion, es decir validar que algo esta alli

  await expect(page.getByText('Invalid credentials')).toBeVisible()


})

})