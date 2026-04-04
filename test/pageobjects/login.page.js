import { $, browser } from '@wdio/globals'
import Page from './page.js'

class LoginPage extends Page {

    get inputUsername () { return $('#user-name') }
    get inputPassword () { return $('#password') }
    get btnSubmit ()     { return $('#login-button') }
    get errorMessage ()  { return $('[data-test="error"]') }

    async resetAndOpen () {
        await browser.reloadSession()
        await browser.url('https://www.saucedemo.com/')
    }

    async login (username, password) {
        await this.inputUsername.setValue(username)
        await this.inputPassword.setValue(password)
        await this.btnSubmit.click()
    }

    async submitEmpty () {
        await this.btnSubmit.click()
    }

    async waitForInventory () {
        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('inventory.html')
        }, { timeout: 15000 })
    }

    open () {
        return super.open()
    }

}

export default new LoginPage()
