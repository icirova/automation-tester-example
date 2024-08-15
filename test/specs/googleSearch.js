import {
  googleSearchBar,
  googleSearchButton,
  linkToMoroSystemsWebsite,
  careersPageLink,
  logo,
  languageSelector,
  czechLanguage,
  englishLanguage
} from "./fixtures.js";


describe("Google Search and Navigation Test", () => {
  // Function to accept cookies if the button is displayed
  async function acceptCookies(selector) {
    const cookiesButton = await $(selector);
    if (await cookiesButton.isDisplayed()) {
      await cookiesButton.click();
    }
  }

  it("should search for MoroSystems on Google and navigate to the Career page", async () => {
    this.retries(3);
    //Opens the browser and navigates to Google
    await browser.url("https://www.google.com");

    //Acceptance of cookies on Google.
    await acceptCookies("#L2AGLb > div");

    //Type "MoroSystems" into the Google search bar
    const searchBar = await $(googleSearchBar);
    await searchBar.setValue("MoroSystems");
    expect(searchBar).toHaveValue("MoroSystems");

    //Display of search results.
    const searchButton = await $(googleSearchButton);
    await searchButton.click();

    //Opening the MoroSystems website.
    const moroLink = await $(linkToMoroSystemsWebsite);
    await moroLink.waitForDisplayed();
    expect(moroLink).toBeDisplayed();
    await moroLink.click();

    // Verify MoroSystems logo is displayed
    const moroLogo = await $(logo);
    await moroLogo.waitForDisplayed();
    expect(moroLogo).toBeDisplayed();

    //Acceptance of cookies on MoroSystems.
    await acceptCookies("#cookiescript_accept");

    (await $(languageSelector)).click();
    (await $(czechLanguage)).click();

    //Clicking on the "Kariéra" link.
    const careerLink = await $(careersPageLink);
    await careerLink.click();

    // Verify the page title contains "Kariéra"
    const pageTitle = await browser.getTitle();
    expect(pageTitle).toContain("Kariéra");

    //Acceptance of cookies on MoroSystems on "Kariéra" page.
    await acceptCookies("#cookiescript_accept");
  });

  
  it("career page should not be found in english version ", async () => {
    //Opens the browser and navigates to Google
    await browser.url("https://www.google.com");

    //Acceptance of cookies on Google.
    await acceptCookies("#L2AGLb > div");

    //Type "MoroSystems" into the Google search bar
    const searchBar = await $(googleSearchBar);
    await searchBar.setValue("MoroSystems");
    expect(searchBar).toHaveValue("MoroSystems");

    //Display of search results.
    const searchButton = await $(googleSearchButton);
    await searchButton.click();

    //Opening the MoroSystems website.
    const moroLink = await $(linkToMoroSystemsWebsite);
    await moroLink.waitForDisplayed();
    expect(moroLink).toBeDisplayed();
    await moroLink.click();

    // Verify MoroSystems logo is displayed
    const moroLogo = await $(logo);
    await moroLogo.waitForDisplayed();
    expect(moroLogo).toBeDisplayed();

    //Acceptance of cookies on MoroSystems.
    await acceptCookies("#cookiescript_accept");

    (await $(languageSelector)).click();
    (await $(englishLanguage)).click()
    
    expect(careersPageLink).not.toExist();
  });
});
