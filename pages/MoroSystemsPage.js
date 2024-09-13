class MoroSystemsPage {
    //Selectors
    get logo() { return $('.logo')};
    get acceptCookiesButton() { return $('#cookiescript_accept')};
    get languageSelector() { return $('.header__lang')};
    get czechLanguage() { return $('a=cz')};
    get careersPageLink() { return $('//a[text()="Kariéra"]')}; //XPath selektor, menu je responzivní
    
    //Actions
    async acceptCookies() {
        const cookiesButton = await this.acceptCookiesButton;
        if (await cookiesButton.isDisplayed()) {
          await cookiesButton.click();
        }
    };

    async verifyLogo() {
        const moroLogo = await this.logo
        await moroLogo.waitForDisplayed(); 
    }

    async switchLanguageToCzech() {
        await this.languageSelector.click();
        await this.czechLanguage.click();
    }

    async navigateToCareer() {
        await this.careersPageLink.click();
    }
}

export default new MoroSystemsPage();