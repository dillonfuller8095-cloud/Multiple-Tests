import { $, $$ } from '@wdio/globals'

class CartPage {

    get cartContainer () { return $('#cart_contents_container') }
    get cartItem ()      { return $('.cart_item') }
    get cartItems ()     { return $$('.cart_item') }
    get checkoutBtn ()   { return $('#checkout') }

    async removeAllItems () {
        const removeButtons = await $$('.cart_button')
        for (const btn of removeButtons) {
            await btn.click()
        }
    }

    async continueShopping () {
        await $('[data-test="continue-shopping"]').click()
    }

}

export default new CartPage()