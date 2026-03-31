import { $ } from '@wdio/globals'

class CartPage {

    get cartItem () {
        return $('.cart_item')
    }

    get checkoutBtn () {
        return $('#checkout')
    }

    get continueShopping () {
        return $('#continue-shopping')
    }

    async clickCheckout () {
        await this.checkoutBtn.click()
    }

    async clickContinueShopping () {
        await this.continueShopping.click()
    }
}

export default new CartPage()