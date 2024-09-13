import { browserUrl } from "../test/specs/fixtures"

class GooglePage {
    //Selectors
    get googleSearchBar() { return $('#APjFqb')}; 
    get googleSearchButton() { return $('.gNO89b')};
    get acceptCookiesButton() { return $("#L2AGLb > div")};
    get linkToMoroSystemsWebsite() { return $('[jsname="UWckNb"]')};
    
    //Actions
    async open() {
        await browser.url(browserUrl);
    };

    async acceptCookies() {
        const cookiesButton = await this.acceptCookiesButton;
        if (await cookiesButton.isDisplayed()) {
          await cookiesButton.click();
        }
    };

    async search(query) {
        await this.googleSearchBar.setValue(query);
        await this.googleSearchButton.waitForDisplayed(); 
        await this.googleSearchButton.waitForClickable();
        await this.googleSearchButton.click();
    }

    async navigateToMoroSystemWebsite() {
        const moroLink = await this.linkToMoroSystemsWebsite;
        await moroLink.waitForDisplayed();
        await moroLink.click()
    }


}

export default new GooglePage();