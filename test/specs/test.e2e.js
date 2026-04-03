import { expect, browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import MenuPage from '../pageobjects/menu.page.js'
import CartPage from '../pageobjects/cart.page.js'
import AboutPage from '../pageobjects/about.page.js'

describe('SauceDemo Step By Step Tests', () => {

    it('Full User Flow', async () => {

        // LOGIN
        await LoginPage.open()
        await LoginPage.enterUsername('standard_user')
        await LoginPage.enterPassword('secret_sauce')
        await LoginPage.clickLogin()

        // ✅ WAIT FOR PAGE TO ACTUALLY LOAD (THIS FIXES YOUR ERROR)
        await browser.waitUntil(async () => {
            const url = await browser.getUrl()
            return url.includes('inventory.html')
        }, {
            timeout: 15000
        })

        await expect(InventoryPage.burgerMenu).toBeDisplayed()

        // ADD ITEM
        await InventoryPage.addBackpackToCart()
        await expect(InventoryPage.cartIcon).toBeDisplayed()

        // OPEN CART
        await InventoryPage.openCart()
        await expect(CartPage.cartItem).toBeDisplayed()

        // REMOVE ITEM
        await CartPage.removeItem()
        await expect(CartPage.cartItem).not.toBeExisting()

        // BACK TO INVENTORY
        await browser.back()

        // ADD MULTIPLE ITEMS
        await InventoryPage.addBackpackToCart()
        await InventoryPage.addMultipleItems()
        await expect(InventoryPage.cartIcon).toBeDisplayed()

        // RESET APP STATE
        await InventoryPage.openMenu()
        await MenuPage.clickReset()

        // VERIFY RESET (item should be gone)
        await expect(InventoryPage.addBackpack).toBeDisplayed()

        // ABOUT PAGE
        await InventoryPage.openMenu()
        await MenuPage.clickAbout()
        await AboutPage.waitForPage()

        const url = await browser.getUrl()
        await expect(url).toContain('saucelabs.com')

        // BACK AGAIN
        await browser.back()

        // LOGOUT
        await InventoryPage.openMenu()
        await MenuPage.clickLogout()

        await expect(LoginPage.loginBtn).toBeDisplayed()

    })

})