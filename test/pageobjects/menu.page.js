import { $ } from '@wdio/globals'

class MenuPage {

    get allItems () {
        return $('#inventory_sidebar_link')
    }

    get about () {
        return $('#about_sidebar_link')
    }

    get logout () {
        return $('#logout_sidebar_link')
    }

    get resetApp () {
        return $('#reset_sidebar_link')
    }

    async clickAllItems () {
        await this.allItems.click()
    }

    async clickAbout () {
        await this.about.click()
    }

    async clickLogout () {
        await this.logout.click()
    }

    async clickReset () {
        await this.resetApp.click()
    }
}

export default new MenuPage()
