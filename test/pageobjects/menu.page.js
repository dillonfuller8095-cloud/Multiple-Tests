import { $ } from '@wdio/globals'

class MenuPage {

    get logout() { return $('#logout_sidebar_link') }
    get resetApp() { return $('#reset_sidebar_link') }
    get about() { return $('#about_sidebar_link') }

    async clickLogout() {
        await this.logout.click()
    }

    async clickReset() {
        await this.resetApp.click()
    }

    async clickAbout() {
        await this.about.click()
    }
}

export default new MenuPage()