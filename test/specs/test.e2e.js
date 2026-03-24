import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import MenuPage from '../pageobjects/menu.page.js'
import CartPage from '../pageobjects/cart.page.js'

describe('SauceDemo Tests', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await InventoryPage.open() // 🔥 FORCE inventory page every time
    })

    it('should open hamburger menu', async () => {
        await InventoryPage.openMenu()
        await expect(MenuPage.allItems).toBeDisplayed()
    })

    it('should logout from menu', async () => {
        await InventoryPage.openMenu()
        await MenuPage.logout.click()
        await expect(LoginPage.btnSubmit).toBeDisplayed()
    })

    it('should reset app state', async () => {
        await InventoryPage.openMenu()
        await MenuPage.resetApp.click()
        await expect(MenuPage.resetApp).toBeExisting()
    })

    it('should add item to cart', async () => {
        await InventoryPage.addItemToCart()
        await expect(InventoryPage.cartIcon).toBeDisplayed()
    })

    it('should open cart', async () => {
        await InventoryPage.openCart()
        await expect(CartPage.checkoutBtn).toBeDisplayed()
    })

    it('should show item in cart', async () => {
        await InventoryPage.addItemToCart()
        await InventoryPage.openCart()
        await expect(CartPage.cartItem).toBeDisplayed()
    })

})