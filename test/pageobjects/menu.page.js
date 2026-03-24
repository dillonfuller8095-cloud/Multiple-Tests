import { $ } from '@wdio/globals'

class MenuPage {

    get allItems () {
        return $('#inventory_sidebar_link')
    }

    get logout () {
        return $('#logout_sidebar_link')
    }

    get resetApp () {
        return $('#reset_sidebar_link')
    }
}

export default new MenuPage()