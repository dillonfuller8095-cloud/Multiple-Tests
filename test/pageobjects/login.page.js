import { $ } from '@wdio/globals'
import Page from './page.js'

class LoginPage extends Page {

    get username() { return $('#user-name') }
    get password() { return $('#password') }
    get loginBtn() { return $('#login-button') }

    async enterUsername(user) {
        await this.username.setValue(user)
    }

    async enterPassword(pass) {
        await this.password.setValue(pass)
    }

    async clickLogin() {
        await this.loginBtn.click()
    }

    open() {
        return super.open('')
    }
}

export default new LoginPage()