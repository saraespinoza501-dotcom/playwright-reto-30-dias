import {Locator, Page, expect } from '@playwright/test'   

export class Usertable {

    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }
    private getAllBodyRows(): Locator {
        return this.page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    }

    private getAdminRows(): Locator{
        const allBodyRows = this.getAllBodyRows()
          //Filas que contienen el role admin
        const currentAdminRows = allBodyRows.filter({
        has: this.page.getByRole('cell').nth(2).getByText('Admin')
    })
    return currentAdminRows

    }
    private async getFirstAdminFromTable(): Promise<Locator> {
        const currentAdminRows = this.getAdminRows()
        const firstAdminToSearch = currentAdminRows.nth(0)
    await expect(firstAdminToSearch, "No admin users found in the table").toHaveCount(1)
    return firstAdminToSearch
}

async editFirstAdminOnTheTable() {
    const firstAdminToEdit= await this.getFirstAdminFromTable()
    
        await firstAdminToEdit
        .locator('button')
        .filter({ has: this.page.locator('i.bi-pencil-fill') }).click()
}


async clickOnDeleteActionByUsername(username: string) {
    const allBodyRows = this.getAllBodyRows()

    const filteredRowByUsername = allBodyRows.filter({
        has: this.page.getByRole('cell').nth(1).getByText(username)
    })
    await expect(filteredRowByUsername, `No rows contain username: ${username} were found`).toHaveCount(1)

    await filteredRowByUsername
    .locator('button')
    .filter({has: this.page.locator('i.bi-trash')}).click()
}

async acceptDeleteUser() {
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click()
}

 async expectUserToBeInTable(username: string) {
    await expect(this.page.getByRole('cell', { name: username, exact: true })).toBeVisible()
}

async expectUserNotInTable(username: string) {
    await expect(this.page.getByRole('cell', { name: username, exact: true })).toHaveCount(0)
}

async searchByUsername(username: string) {
    await expect(this.page).toHaveURL(/viewSystemUsers/)
    await expect(this.getAllBodyRows().first()).toBeVisible()

    const usernameFilter = this.page.locator('div.oxd-grid-item--gutters')
        .filter({ has: this.page.getByText('Username', { exact: true }) })
        .getByRole('textbox')

    await usernameFilter.fill(username)
    await this.page.getByRole('button', { name: 'Search' }).click()

    await expect(this.page.getByText(/\(1\) Record Found/)).toBeVisible()
}
  
    
}