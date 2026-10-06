import { test, expect } from '@playwright/test';

test.describe('Menu Lateral', ()=>{

// Nombre del test
test('Check left menu options', async ({ page }) => {

  // 1. Navegar a la página de login
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  // 2. Completar el usuario
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');

  // 3. Completar la contraseña
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');

  // 4. Hacer clic en el botón Login
  await page.getByRole('button', { name: 'Login' }).click();

  // 5. Verificar que el menú "Admin" aparece (confirmación de login exitoso)
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

  // 6. Obtener todos los elementos del menú lateral
  //    "Sidepanel" es el contenedor del menú
  const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem');
  
   // ⭐ NUEVA ASERCIÓN: comprobar que la primera opción es "Admin"

  await expect(leftMenuItems.nth(0)).toHaveText('Admin');


  // 7. Contar cuántos elementos hay en el menú
  //    IMPORTANTE: count() es una promesa → necesita await
  const currentMenuItemsCount = await leftMenuItems.count();
  console.log('Current menu items count:', currentMenuItemsCount);

  // 8. Crear un array vacío donde guardaremos los textos del menú
  const currentMenuItems: string[] = [];

  // 9. Recorrer cada item del menú y obtener su texto
  for (let i = 0; i < currentMenuItemsCount; i++) {
    const menuText = await leftMenuItems.nth(i).innerText(); // obtener texto del item
    currentMenuItems.push(menuText); // guardarlo en el array
  }

  // 10. Mostrar en consola los textos obtenidos
  console.log('Current menu items:', currentMenuItems);

  // 11. Lista esperada de elementos del menú
  const expectedMenuItems = [
    'Admin',
    'PIM',
    'Leave',
    'Time',
    'Recruitment',
    'My Info',
    'Performance',
    'Dashboard',
    'Directory',
    'Maintenance',
    'Claim',
    'Buzz'
  ];

  // 12. Comparar que el menú actual coincide con el esperado
  expect(currentMenuItems).toEqual(expectedMenuItems);
});

test('Navigate though teh left panel', async ({page})=>{

  await page.goto('https://opensource-demo.orangehrmlive.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin'); 
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');  
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

  const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem');  
  const currentMenuItemsCount = await leftMenuItems.count();

  for(let i= 0; i<currentMenuItemsCount; i++){
    const menuItem = leftMenuItems.nth(i)
    const menuText = await menuItem.innerText()

    console.log('Current menu item', menuText)
     // Cuando el texto sea "Maintenance", hacer clic y volver atrás
    if (menuText === 'Maintenance') {
      await menuItem.click();
      await page.goBack();
    }
  }

  })
})



/*import {test, expect} from '@playwright/test'

test('Check left menu options', async ({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole ('button', {name: 'Login'}).click()   

   await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

   const leftMenuItems =  page.getByLabel('Sidepanel').getByRole('listitem')
   const currentMenuItemsCount= await leftMenuItems.count()
   console.log('Current menu items count', currentMenuItemsCount)

   const currentMenuItems: String [] = []

   for(let i=0; i<currentMenuItemsCount; i++){
     const menuText = await leftMenuItems.nth(i).innerText()
     currentMenuItems.push(menuText)
   }

   console.log(currentMenuItems)
   const expectedMenuItems= [

  'Admin',
  'PIM',
  'Leave',
  'Time',
  'Recruitment',
  'My Info',
  'Performance',
  'Dashboard',
  'Directory',
  'Maintenance',
  'Claim',
  'Buzz'
];
   
expect(currentMenuItems).toEqual(expectedMenuItems)
})*/