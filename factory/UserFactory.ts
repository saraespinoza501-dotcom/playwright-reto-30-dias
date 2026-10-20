import { UserModel } from "../models/UserModel"

export class UserFactory {

    private static defaultPassword = "Password123!"

    private static base(overrides?: Partial<UserModel>): UserModel {
        const defaults: UserModel = {
            username: 'user' + crypto.randomUUID().slice(0, 8),
            employeeName: 'Default Employee',
            password: this.defaultPassword,
            confirmPassword: this.defaultPassword,
            role: 'ESS',
            status: 'Enabled'
        }
        return { ...defaults, ...overrides }
    }

    static createEmployeeESS(overrides?: Partial<UserModel>) {
        return this.base({ ...overrides, role: 'ESS' })
    }

    static createAdmin(overrides?: Partial<UserModel>) {
        return this.base({ ...overrides, role: 'Admin' })
    }
}