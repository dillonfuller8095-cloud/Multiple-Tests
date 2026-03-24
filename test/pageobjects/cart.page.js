import { $ } from '@wdio/globals'

class CartPage {

    get cartItem () {
        return $('.cart_item')
    }

    get checkoutBtn () {
        return $('#checkout')
    }
}

export default new CartPage()