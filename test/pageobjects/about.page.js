import { browser } from '@wdio/globals'

class AboutPage {

    async waitForPage () {
        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('saucelabs.com')
        }, { timeout: 15000 })
    }

}

export default new AboutPage()
