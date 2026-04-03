import { $ } from '@wdio/globals'

class MenuPage {

    get allItems ()  { return $('#inventory_sidebar_link') }
    get logout ()    { return $('#logout_sidebar_link') }
    get resetApp ()  { return $('#reset_sidebar_link') }
    get reset ()     { return $('#reset_sidebar_link') }
    get about ()     { return $('#about_sidebar_link') }

    async clickReset ()  { await this.reset.click() }
    async clickLogout () { await this.logout.click() }
    async clickAbout ()  { await this.about.click() }

}

export default new MenuPage()