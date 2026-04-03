import { browser } from '@wdio/globals'

class AboutPage {

    async waitForPage() {
        await browser.waitUntil(async () => {
            const url = await browser.getUrl()
            return url.includes('saucelabs.com')
        }, {
            timeout: 10000
        })
    }

}

export default new AboutPage()