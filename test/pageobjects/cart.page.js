import { $ } from '@wdio/globals'

class CartPage {

    get cartItem() {
        return $('.cart_item')
    }

    get checkoutBtn() {
        return $('#checkout')
    }

    get removeBtn() {
        return $('#remove-sauce-labs-backpack')
    }

    async removeItem() {
        await this.removeBtn.waitForClickable({ timeout: 10000 })
        await this.removeBtn.click()
    }
}

export default new CartPage()
