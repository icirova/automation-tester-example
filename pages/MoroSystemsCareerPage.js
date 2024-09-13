class MoroSystemsCarrerPage {
    //Selectors 
    get acceptCookiesButton() { return $('#cookiescript_accept')};

    //Actions
    async getTitle() {
        return await browser.getTitle();
       
    }

    async acceptCookies() {
        const cookiesButton = await this.acceptCookiesButton;
        if (await cookiesButton.isDisplayed()) {
          await cookiesButton.click();
        }
    };
}

export default new MoroSystemsCarrerPage();