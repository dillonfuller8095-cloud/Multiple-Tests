import { $ } from '@wdio/globals'

class MenuPage {

    get allItems() {
        return $('#inventory_sidebar_link')
    }

    get about() {
        return $('#about_sidebar_link')
    }

    get logout() {
        return $('#logout_sidebar_link')
    }

    get resetApp() {
        return $('#reset_sidebar_link')
    }

    async clickAbout() {
        await this.about.waitForClickable({ timeout: 10000 })
        await this.about.click()
    }

    async clickLogout() {
        await this.logout.waitForClickable({ timeout: 10000 })
        await this.logout.click()
    }

    async clickReset() {
        await this.resetApp.waitForClickable({ timeout: 10000 })
        await this.resetApp.click()
    }
}

export default new MenuPage()
