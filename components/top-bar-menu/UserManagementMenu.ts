import {Locator, Page } from "@playwright/test";

export class UserManagementMenu{
    readonly page:Page
    readonly UserManagement: Locator
    readonly usersOption:Locator

    constructor(page: Page){
         this.page = page
         this.UserManagement = page.getByRole('navigation', {name: 'Topbar Menu'}). getByText('user Management')
         this.usersOption = page.getByRole('menuitem', {name: 'users'})

    }
   private async clickOnUserManagement () {
        await this.UserManagement.click()
    }
    
    async clickOnUsers(){

         this.clickOnUserManagement()
       await this.usersOption.click()

    }
    
}