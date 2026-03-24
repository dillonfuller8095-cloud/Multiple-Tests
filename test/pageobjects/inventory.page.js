import { $ } from '@wdio/globals'
import Page from './page.js'

class InventoryPage extends Page {

    get burgerMenu () {
        return $('#react-burger-menu-btn')
    }

    get cartIcon () {
        return $('.shopping_cart_link')
    }

    get firstItemAddBtn () {
        return $('#add-to-cart-sauce-labs-backpack')
    }

    open () {
        return super.open('inventory.html') // 🔥 FORCE correct page
    }

    async openMenu() {
        await this.burgerMenu.waitForDisplayed({ timeout: 10000 })
        await this.burgerMenu.click()
    }

    async openCart() {
        await this.cartIcon.waitForDisplayed({ timeout: 10000 })
        await this.cartIcon.click()
    }

    async addItemToCart() {
        await this.firstItemAddBtn.waitForDisplayed({ timeout: 10000 })
        await this.firstItemAddBtn.click()
    }
}

export default new InventoryPage()