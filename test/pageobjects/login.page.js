import { $ } from '@wdio/globals'
import Page from './page.js'

class LoginPage extends Page {

    get inputUsername () {
        return $('#user-name')
    }

    get inputPassword () {
        return $('#password')
    }

    get btnLogin () {
        return $('#login-button')
    }

    async login (username, password) {
        await this.inputUsername.setValue(username)
        await this.inputPassword.setValue(password)
        await this.btnLogin.click()
    }
}

export default new LoginPage()