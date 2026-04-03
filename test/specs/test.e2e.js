import { expect, browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import MenuPage from '../pageobjects/menu.page.js'
import CartPage from '../pageobjects/cart.page.js'
import AboutPage from '../pageobjects/about.page.js'

describe('SauceDemo FULL QA Assertions', () => {

    beforeEach(async () => {

        // reset session
        await browser.reloadSession()

        // go to site
        await browser.url('https://www.saucedemo.com/')

        // ASSERT - Login page is displayed (MTQA-5140)
        await expect(LoginPage.inputUsername).toBeDisplayed()
        await expect(LoginPage.inputPassword).toBeDisplayed()
        await expect(LoginPage.btnSubmit).toBeDisplayed()

        // enter credentials
        await LoginPage.inputUsername.setValue('standard_user')

        // ASSERT - Username entered successfully (MTQA-5140)
        await expect(LoginPage.inputUsername).toHaveValue('standard_user')

        await LoginPage.inputPassword.setValue('secret_sauce')

        // ASSERT - Password entered successfully (MTQA-5140)
        await expect(LoginPage.inputPassword).toHaveValue('secret_sauce')

        // click login
        await LoginPage.btnSubmit.click()

        // ASSERT - User is redirected to inventory page (MTQA-5140)
        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('inventory.html')
        }, { timeout: 15000 })

        await expect(InventoryPage.burgerMenu).toBeDisplayed()
        await expect(InventoryPage.cartIcon).toBeDisplayed()
    })

    //  NEGATIVE LOGIN TESTS

    it('negative - wrong password shows error', async () => {

        await browser.reloadSession()
        await browser.url('https://www.saucedemo.com/')

        await LoginPage.inputUsername.setValue('standard_user')
        await LoginPage.inputPassword.setValue('wrong_password')
        await LoginPage.btnSubmit.click()

        // ASSERT - error message is displayed
        await expect(LoginPage.errorMessage).toBeDisplayed()

        // ASSERT - still on login page
        await expect(await browser.getUrl()).not.toContain('inventory.html')

        // ASSERT - login button still visible
        await expect(LoginPage.btnSubmit).toBeDisplayed()
    })

    it('negative - wrong username shows error', async () => {

        await browser.reloadSession()
        await browser.url('https://www.saucedemo.com/')

        await LoginPage.inputUsername.setValue('invalid_user')
        await LoginPage.inputPassword.setValue('secret_sauce')
        await LoginPage.btnSubmit.click()

        // ASSERT - error message is displayed
        await expect(LoginPage.errorMessage).toBeDisplayed()

        // ASSERT - still on login page
        await expect(await browser.getUrl()).not.toContain('inventory.html')
    })

    it('negative - empty fields show error', async () => {

        await browser.reloadSession()
        await browser.url('https://www.saucedemo.com/')

        await LoginPage.btnSubmit.click()

        // ASSERT - error message is displayed
        await expect(LoginPage.errorMessage).toBeDisplayed()

        // ASSERT - still on login page
        await expect(await browser.getUrl()).not.toContain('inventory.html')
    })

    it('negative - locked out user shows error', async () => {

        await browser.reloadSession()
        await browser.url('https://www.saucedemo.com/')

        await LoginPage.inputUsername.setValue('locked_out_user')
        await LoginPage.inputPassword.setValue('secret_sauce')
        await LoginPage.btnSubmit.click()

        // ASSERT - error message is displayed
        await expect(LoginPage.errorMessage).toBeDisplayed()

        // ASSERT - still on login page
        await expect(await browser.getUrl()).not.toContain('inventory.html')
    })


    // CART BADGE UI TESTS

    it('cart badge shows 1 after adding one item', async () => {

        await InventoryPage.addBackpackToCart()

        // ASSERT - cart badge is displayed
        await expect(InventoryPage.cartBadge).toBeDisplayed()

        // ASSERT - cart badge shows correct count
        await expect(InventoryPage.cartBadge).toHaveText('1')
    })

    it('cart badge increments correctly with multiple items', async () => {

        await InventoryPage.addBackpackToCart()

        // ASSERT - badge shows 1
        await expect(InventoryPage.cartBadge).toHaveText('1')

        await InventoryPage.addBikeLightToCart()

        // ASSERT - badge increments to 2
        await expect(InventoryPage.cartBadge).toHaveText('2')
    })

    it('cart badge disappears after removing all items', async () => {

        await InventoryPage.addBackpackToCart()

        // ASSERT - badge is visible
        await expect(InventoryPage.cartBadge).toBeDisplayed()

        await InventoryPage.openCart()
        await CartPage.removeAllItems()

        // ASSERT - badge is gone after cart is empty
        await expect(InventoryPage.cartBadge).not.toBeDisplayed()
    })

    // BUTTON STATE CHANGE TESTS
    

    it('add to cart button changes to remove after click', async () => {

        // ASSERT - add button is displayed before click
        await expect(InventoryPage.addBackpack).toBeDisplayed()

        await InventoryPage.addBackpackToCart()

        // ASSERT - add button is gone
        await expect(InventoryPage.addBackpack).not.toBeDisplayed()

        // ASSERT - remove button is now displayed
        await expect(InventoryPage.removeBackpack).toBeDisplayed()
    })

    it('remove button changes back to add after click', async () => {

        await InventoryPage.addBackpackToCart()

        // ASSERT - remove button is displayed
        await expect(InventoryPage.removeBackpack).toBeDisplayed()

        await InventoryPage.removeBackpackFromInventory()

        // ASSERT - remove button is gone
        await expect(InventoryPage.removeBackpack).not.toBeDisplayed()

        // ASSERT - add button is back
        await expect(InventoryPage.addBackpack).toBeDisplayed()
    })

   
    // NAVIGATION FLOW TESTS

    it('cart icon navigates to cart page', async () => {

        await InventoryPage.openCart()

        // ASSERT - URL is cart page
        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('cart.html')
        }, { timeout: 15000 })

        // ASSERT - cart container is displayed
        await expect(CartPage.cartContainer).toBeDisplayed()
    })

    it('continue shopping navigates back to inventory', async () => {

        await InventoryPage.openCart()

        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('cart.html')
        }, { timeout: 15000 })

        await CartPage.continueShopping()

        // ASSERT - back on inventory page
        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('inventory.html')
        }, { timeout: 15000 })

        // ASSERT - inventory elements visible
        await expect(InventoryPage.burgerMenu).toBeDisplayed()
        await expect(InventoryPage.inventoryItems).toBeDisplayed()
    })


    // MENU CLOSE TESTS
    

    it('hamburger menu opens and closes correctly', async () => {

        await InventoryPage.openMenu()

        // ASSERT - menu items are displayed
        await expect(MenuPage.allItems).toBeDisplayed()
        await expect(MenuPage.logout).toBeDisplayed()
        await expect(MenuPage.about).toBeDisplayed()

        await InventoryPage.closeMenu()

        // ASSERT - menu items are gone after close
        await expect(MenuPage.logout).not.toBeDisplayed()
        await expect(MenuPage.about).not.toBeDisplayed()
        await expect(MenuPage.allItems).not.toBeDisplayed()
    })

    it('hamburger menu stable after multiple opens and closes', async () => {

        await InventoryPage.openMenu()
        await InventoryPage.closeMenu()
        await InventoryPage.openMenu()
        await InventoryPage.closeMenu()
        await InventoryPage.openMenu()

        // ASSERT - menu still works correctly
        await expect(MenuPage.resetApp).toBeDisplayed()
        await expect(MenuPage.logout).toBeDisplayed()
        await expect(MenuPage.about).toBeDisplayed()
    })

    // EDGE CASE TESTS

    it('edge case - cart persists items after navigating away and back', async () => {

        await InventoryPage.addBackpackToCart()

        // ASSERT - badge shows 1
        await expect(InventoryPage.cartBadge).toHaveText('1')

        await InventoryPage.openCart()
        await CartPage.continueShopping()

        // ASSERT - badge still shows 1 after returning
        await expect(InventoryPage.cartBadge).toHaveText('1')
    })

    it('edge case - empty cart navigates to cart page correctly', async () => {

        await InventoryPage.openCart()

        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('cart.html')
        }, { timeout: 15000 })

        // ASSERT - cart page loads fine even when empty
        await expect(CartPage.cartContainer).toBeDisplayed()

        // ASSERT - no items in empty cart
        await expect(await CartPage.cartItems.length).toBe(0)
    })

    
    // CORE TESTS
     

    // MTQA-5142 - View Item in Cart
    it('add item to cart with full validation', async () => {

        // ASSERT - add button exists before click
        await expect(InventoryPage.addBackpack).toBeDisplayed()

        await InventoryPage.addBackpackToCart()

        // ASSERT - button changes to remove
        await expect(InventoryPage.addBackpack).not.toBeDisplayed()

        // ASSERT - cart icon still displayed
        await expect(InventoryPage.cartIcon).toBeDisplayed()

        await InventoryPage.openCart()

        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('cart.html')
        }, { timeout: 15000 })

        // ASSERT - cart displays the added item (MTQA-5142)
        await expect(await CartPage.cartItems.length).toBeGreaterThan(0)
    })

    // MTQA-5146 - Remove Item from Cart
    it('remove item from cart with validation', async () => {

        await InventoryPage.addBackpackToCart()
        await InventoryPage.openCart()

        // ASSERT - item exists before removal
        await expect(await CartPage.cartItems.length).toBeGreaterThan(0)

        await CartPage.removeAllItems()

        // ASSERT - cart is empty (MTQA-5146)
        await expect(await CartPage.cartItems.length).toBe(0)
    })

    // MTQA-5146 - Add Multiple Items
    it('add multiple items and verify each step', async () => {

        await InventoryPage.addBackpackToCart()

        // ASSERT - still on inventory page
        await expect(InventoryPage.burgerMenu).toBeDisplayed()

        await InventoryPage.addBikeLightToCart()

        // ASSERT - cart icon still displayed
        await expect(InventoryPage.cartIcon).toBeDisplayed()

        await InventoryPage.openCart()

        // ASSERT - exactly 2 items in cart (MTQA-5146)
        await expect(await CartPage.cartItems.length).toBe(2)
    })

    // MTQA-5141 - Reset App State
    it('reset app state clears everything', async () => {

        await InventoryPage.addBackpackToCart()

        await expect(InventoryPage.cartIcon).toBeDisplayed()

        await InventoryPage.openMenu()

        // ASSERT - menu is displayed (MTQA-5141)
        await expect(MenuPage.resetApp).toBeDisplayed()

        await MenuPage.clickReset()

        // ASSERT - still on inventory page
        await expect(InventoryPage.burgerMenu).toBeDisplayed()

        await InventoryPage.openCart()

        // ASSERT - cart is cleared (MTQA-5141)
        await expect(await CartPage.cartItems.length).toBe(0)
    })

    // MTQA-5145 - About Navigation
    it('about page navigation full validation', async () => {

        await InventoryPage.openMenu()

        // ASSERT - about link is displayed (MTQA-5145)
        await expect(MenuPage.about).toBeDisplayed()

        await MenuPage.clickAbout()

        await AboutPage.waitForPage()

        // ASSERT - redirected to Sauce Labs website (MTQA-5145)
        await expect(await browser.getUrl()).toContain('saucelabs.com')
    })

    // MTQA-5143 - Logout
    it('logout full validation', async () => {

        await InventoryPage.openMenu()

        // ASSERT - logout link is displayed (MTQA-5143)
        await expect(MenuPage.logout).toBeDisplayed()

        await MenuPage.clickLogout()

        // ASSERT - back on login page (MTQA-5143)
        await expect(LoginPage.btnSubmit).toBeDisplayed()
        await expect(LoginPage.inputUsername).toBeDisplayed()
    })

    // MTQA-5231 - Inventory Item Display
    it('inventory items are displayed after login', async () => {

        await expect(InventoryPage.burgerMenu).toBeDisplayed()

        // ASSERT - inventory items are visible (MTQA-5231)
        await expect(InventoryPage.inventoryItems).toBeDisplayed()
    })

    // MTQA-5228 - Open Cart Page
    it('clicking cart icon opens cart page', async () => {

        await InventoryPage.openCart()

        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('cart.html')
        }, { timeout: 15000 })

        // ASSERT - cart page container is displayed (MTQA-5228)
        await expect(CartPage.cartContainer).toBeDisplayed()
    })

    // MTQA-5234 - Empty Cart State
    it('empty cart shows no items', async () => {

        await InventoryPage.openCart()

        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('cart.html')
        }, { timeout: 15000 })

        // ASSERT - cart is empty (MTQA-5234)
        await expect(await CartPage.cartItems.length).toBe(0)
    })

    // MTQA-5235 - Hamburger Menu UI Stability
    it('hamburger menu opens and closes consistently', async () => {

        await InventoryPage.openMenu()
        await InventoryPage.closeMenu()
        await InventoryPage.openMenu()

        // ASSERT - no UI overlap or glitches (MTQA-5235)
        await expect(MenuPage.resetApp).toBeDisplayed()
        await expect(MenuPage.logout).toBeDisplayed()
        await expect(MenuPage.about).toBeDisplayed()
    })

})