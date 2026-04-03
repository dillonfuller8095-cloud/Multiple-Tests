import { $, $$ } from '@wdio/globals'
import Page from './page.js'

class InventoryPage extends Page {

    get burgerMenu ()     { return $('#react-burger-menu-btn') }
    get cartIcon ()       { return $('.shopping_cart_link') }
    get cartBadge ()      { return $('.shopping_cart_badge') }
    get addBackpack ()    { return $('[data-test="add-to-cart-sauce-labs-backpack"]') }
    get removeBackpack () { return $('[data-test="remove-sauce-labs-backpack"]') }
    get addBikeLight ()   { return $('[data-test="add-to-cart-sauce-labs-bike-light"]') }
    get inventoryItems () { return $('.inventory_list') }

    open () {
        return super.open('inventory.html')
    }

    async openMenu () {
        await this.burgerMenu.waitForDisplayed({ timeout: 10000 })
        await this.burgerMenu.click()
    }

    async closeMenu () {
        await $('#react-burger-cross-btn').waitForDisplayed({ timeout: 10000 })
        await $('#react-burger-cross-btn').click()
    }

    async openCart () {
        await this.cartIcon.waitForDisplayed({ timeout: 10000 })
        await this.cartIcon.click()
    }

    async addBackpackToCart () {
        await this.addBackpack.waitForDisplayed({ timeout: 10000 })
        await this.addBackpack.click()
    }

    async removeBackpackFromInventory () {
        await this.removeBackpack.waitForDisplayed({ timeout: 10000 })
        await this.removeBackpack.click()
    }

    async addBikeLightToCart () {
        await this.addBikeLight.waitForDisplayed({ timeout: 10000 })
        await this.addBikeLight.click()
    }

}

export default new InventoryPage()