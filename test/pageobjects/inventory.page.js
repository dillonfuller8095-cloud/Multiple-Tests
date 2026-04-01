import { $ } from '@wdio/globals'
import Page from './page.js'

class InventoryPage extends Page {

    // elements
    get inventoryContainer() {
        return $('#inventory_container')
    }

    get burgerMenu() {
        return $('#react-burger-menu-btn')
    }

    get cartIcon() {
        return $('.shopping_cart_link')
    }

    get addBackpack() {
        return $('#add-to-cart-sauce-labs-backpack')
    }

    get removeBackpack() {
        return $('#remove-sauce-labs-backpack')
    }

    get addBikeLight() {
        return $('#add-to-cart-sauce-labs-bike-light')
    }

    // actions
    async waitForPageLoaded() {
        await this.inventoryContainer.waitForDisplayed({ timeout: 10000 })
    }

    async openMenu() {
        await this.burgerMenu.waitForClickable({ timeout: 10000 })
        await this.burgerMenu.click()
    }

    async addItemToCart() {
        await this.addBackpack.waitForClickable({ timeout: 10000 })
        await this.addBackpack.click()
    }

    async removeItemFromCart() {
        await this.removeBackpack.waitForClickable({ timeout: 10000 })
        await this.removeBackpack.click()
    }

    async addMultipleItems() {
        await this.addBackpack.click()
        await this.addBikeLight.click()
    }

    async rapidClickAdd(times = 5) {
        for (let i = 0; i < times; i++) {
            await this.addBackpack.click()
        }
    }

    async openCart() {
        await this.cartIcon.waitForClickable({ timeout: 10000 })
        await this.cartIcon.click()
    }

    open() {
        return super.open('inventory.html')
    }
}

export default new InventoryPage()
