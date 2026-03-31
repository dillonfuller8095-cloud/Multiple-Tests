import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import MenuPage from '../pageobjects/menu.page.js'
import CartPage from '../pageobjects/cart.page.js'

describe('SauceDemo Tests', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await InventoryPage.burgerMenu.waitForDisplayed({ timeout: 5000 })
    })

    it('should open hamburger menu', async () => {
        await InventoryPage.openMenu()
        await MenuPage.allItems.waitForDisplayed({ timeout: 5000 })
        await expect(MenuPage.allItems).toBeDisplayed()
    })

    it('should logout from menu', async () => {
        await InventoryPage.openMenu()
        await MenuPage.logout.waitForDisplayed({ timeout: 5000 })
        await MenuPage.logout.click()
        await LoginPage.loginBtn.waitForDisplayed({ timeout: 5000 })
        await expect(LoginPage.loginBtn).toBeDisplayed()
    })

    it('should reset app state', async () => {
        await InventoryPage.addItemToCart()
        await InventoryPage.openMenu()
        await MenuPage.resetApp.waitForDisplayed({ timeout: 5000 })
        await MenuPage.resetApp.click()
        await expect(MenuPage.resetApp).toBeExisting()
    })

    it('should add item to cart', async () => {
        await InventoryPage.addItemToCart()
        await expect(InventoryPage.cartIcon).toBeDisplayed()
    })

    it('should open cart', async () => {
        await InventoryPage.openCart()
        await CartPage.checkoutBtn.waitForDisplayed({ timeout: 5000 })
        await expect(CartPage.checkoutBtn).toBeDisplayed()
    })

    it('should show item in cart', async () => {
        await InventoryPage.addItemToCart()
        await InventoryPage.openCart()
        await CartPage.cartItem.waitForDisplayed({ timeout: 5000 })
        await expect(CartPage.cartItem).toBeDisplayed()
    })

})