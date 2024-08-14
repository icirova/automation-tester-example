// const { expect } = require('@wdio/globals')
// const LoginPage = require('../../pageobjects/login.page')
// const SecurePage = require('../../pageobjects/secure.page')

describe("Google Search and Navigation Test", () => {
  it("should search for MoroSystems on Google and navigate to the Career page", async () => {

    //Otevře prohlížeč a přejde na Google
    await browser.url("https://www.google.com");

    // Cookies
    const acceptCookiesButton = await $('#L2AGLb > div');
        if (await acceptCookiesButton.isDisplayed()) {
            await acceptCookiesButton.click();
        }

    const googleSearchBar = $("#APjFqb");
    await googleSearchBar.setValue("MoroSystems");

    const googleSearchButton = $('.gNO89b')
    await googleSearchButton.click()

    const linkToMoroSystemsWebsite = $('[jsname="UWckNb"]')
    await linkToMoroSystemsWebsite.click()

    await browser.pause(3000)

  });
});
