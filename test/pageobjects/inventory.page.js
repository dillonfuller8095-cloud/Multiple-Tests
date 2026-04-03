import { $ , browser } from '@wdio/globals'
import Page from './page.js'

class InventoryPage extends Page {

    get burgerMenu() { return $('#react-burger-menu-btn') }
    get cartIcon() { return $('.shopping_cart_link') }

    get addBackpack() { return $('#add-to-cart-sauce-labs-backpack') }

    async waitForPage() {
        await browser.waitUntil(async () => {
            return await this.burgerMenu.isDisplayed()
        }, {
            timeout: 15000,
            timeoutMsg: 'Inventory page did not load'
        })
    }

    async addBackpackToCart() {
        await browser.waitUntil(async () => {
            return await this.addBackpack.isDisplayed()
        }, {
            timeout: 15000,
            timeoutMsg: 'Backpack button not visible'
        })

        await this.addBackpack.click()
    }

    async openMenu() {
        await this.burgerMenu.click()
    }

    async openCart() {
        await this.cartIcon.click()
    }

    open() {
        return super.open('inventory.html')
    }
}

export default new InventoryPage()