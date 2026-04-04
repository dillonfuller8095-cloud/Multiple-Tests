import { $, $$, browser } from '@wdio/globals'

class CartPage {

    get cartContainer () { return $('#cart_contents_container') }
    get cartItem ()      { return $('.cart_item') }
    get cartItems ()     { return $$('.cart_item') }
    get checkoutBtn ()   { return $('#checkout') }

    async waitForPage () {
        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('cart.html')
        }, { timeout: 15000 })
    }

    async removeAllItems () {
        const removeButtons = await $$('.cart_button')
        for (const btn of removeButtons) {
            await btn.click()
        }
    }

    async continueShopping () {
        await $('[data-test="continue-shopping"]').waitForDisplayed({ timeout: 10000 })
        await $('[data-test="continue-shopping"]').click()
    }

}

export default new CartPage()
