# Automation-tester-example
Solution Example for Automation Tester

[![Testing](https://github.com/icirova/automation-tester-example/actions/workflows/testing.js.yml/badge.svg)](https://github.com/icirova/automation-tester-example/actions/workflows/testing.js.yml)

## Test Case
1. Open the browser
2. Go to the Google search bar
3. Type company name into the Google search bar
4. Display search results
5. Go to company website
6. Visit the "Kariéra" page on this domain

## Technologies
* WebdriverIO
* Mocha
* Spec reporter
* Allure reporter

## Prerequesities for start 
Downloaded and installed a latest version of [Node.JS](https://nodejs.org/en) and Java 11+

## Test run instructions

```sh
npm install

npm run wdio
```

Once the test is finished, you can open the Allure report with:

```sh
npm run allure:open
```

