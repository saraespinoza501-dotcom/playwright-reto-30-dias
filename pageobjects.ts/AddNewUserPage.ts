import { Locator, Page } from "@playwright/test"

export class AddNewUserPage {

  readonly page: Page
  readonly addButton: Locator
  readonly userRoleDropdown: Locator
  readonly employeeInput: Locator
  readonly statusDropdown: Locator
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly confirmPasswordInput: Locator
  readonly saveButton: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    this.page = page

    this.addButton = page.getByText('Add')

    this.userRoleDropdown = page.locator('div.oxd-grid-item--gutters')
      .filter({ has: page.getByText('User Role') })
      .locator('div.oxd-select-text-input')

    this.employeeInput = page.getByRole('textbox', { name: 'Type for hints...' })

    this.statusDropdown = page.locator('div.oxd-grid-item--gutters')
      .filter({ has: page.getByText('Status') })
      .locator('div.oxd-select-text-input')

    this.usernameInput = page.locator('div.oxd-grid-item--gutters')
      .filter({ has: page.getByText('Username') })
      .getByRole('textbox')

    this.passwordInput = page.locator('div.oxd-grid-item--gutters')
      .filter({ has: page.getByText('Password', { exact: true }) })
      .getByRole('textbox')

    this.confirmPasswordInput = page.locator('div.oxd-grid-item--gutters')
      .filter({ has: page.getByText('Confirm Password', { exact: true }) })
      .getByRole('textbox')

    this.saveButton = page.getByRole('button', { name: 'Save' })

    this.successMessage = page.locator('p.oxd-text--toast-message')
  }

  async clickOnAdd() {
    await this.addButton.click()
  }

  async selectUserRole(role: string) {
    await this.userRoleDropdown.click()
    await this.page.getByRole('option', { name: role }).click()
  }

  async selectEmployee(employeeName: string) {
    await this.employeeInput.fill(employeeName)
    await this.page.getByRole('option', { name: employeeName }).click()
  }

  async selectStatus(status: string) {
    await this.statusDropdown.click()
    await this.page.getByRole('option', { name: status }).click()
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username)
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password)
  }

  async enterConfirmPassword(confirmPassword: string) {
    await this.confirmPasswordInput.fill(confirmPassword)
  }

  async clickOnSave() {
    await this.saveButton.click()
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent()
  }
}