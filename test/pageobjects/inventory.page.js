import { $ } from '@wdio/globals'
import Page from './page.js'

class InventoryPage extends Page {

    get burgerMenu () {
        return $('#react-burger-menu-btn')
    }

    get cartIcon () {
        return $('.shopping_cart_link')
    }

    get addToCartButton () {
        return $('button*=Add to cart')
    }

    async openMenu () {
        await this.burgerMenu.click()
    }

    async addItemToCart () {
        await this.addToCartButton.click()
    }

    async openCart () {
        await this.cartIcon.click()
    }
}

export default new InventoryPage()