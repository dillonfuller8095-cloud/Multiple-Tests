import { $ } from '@wdio/globals'

class CartPage {

    get cartItem() {
        return $('.inventory_item_name')
    }

    get removeBtn() {
        return $('#remove-sauce-labs-backpack')
    }

    async removeItem() {
        await this.removeBtn.waitForDisplayed()
        await this.removeBtn.click()
    }
}

export default new CartPage()