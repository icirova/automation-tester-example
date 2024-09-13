import GooglePage from "../../pages/GooglePage";
import MoroSystemsPage from "../../pages/MoroSystemsPage";
import MoroSystemsCareerPage from "../../pages/MoroSystemsCareerPage";
  
describe("Google Search and Navigation Test", () => {


  it("should search for MoroSystems on Google and navigate to the Career page", async () => {
    //Opens the browser and navigates to Google
    await GooglePage.open();

    //Acceptance of cookies on Google.
    await GooglePage.acceptCookies();

    //Type "MoroSystems" into the Google search bar
    await GooglePage.search("MoroSystems");
    expect(await GooglePage.googleSearchBar.getValue()).toBe("MoroSystems");

    //Opening the MoroSystems website.
    await GooglePage.navigateToMoroSystemWebsite();
    expect(GooglePage.moroLink).toBeDisplayed();
    

    // Verify MoroSystems logo is displayed
    await MoroSystemsPage.verifyLogo();
    expect(MoroSystemsPage.moroLogo).toBeDisplayed();

    //Acceptance of cookies on MoroSystems.
    await MoroSystemsPage.acceptCookies();

    //Language switch to Czech
    await MoroSystemsPage.switchLanguageToCzech();;

    //Clicking on the "Kariéra" link.
    await MoroSystemsPage.navigateToCareer();

    // Verify the page title contains "Kariéra"
    const title = await MoroSystemsCareerPage.getTitle();
    expect(title).toContain("Kariéra");

    //Acceptance of cookies on MoroSystems on "Kariéra" page.
    await MoroSystemsCareerPage.acceptCookies();
  });
});
