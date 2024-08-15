import allureCmd from 'allure-commandline';
import { rmdir } from 'fs';
const allureTmpDirectory = './allure-results';
const allureReportDirectory = './allure-report';

export const config = {

    runner: 'local',

    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
        './test/specs/fixtures.js'
    ],
    maxInstances: 10,

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--headless',
                '--disable-gpu', 
                '--window-size=1920,1080',
                '--disable-search-engine-choice-screen',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-infobars'
            ]}
    }],

    logLevel: 'info',
   
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results', 
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            addConsoleLogs: true
        }],
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    onPrepare: function() {
        rmdir(allureTmpDirectory, { recursive: true }, err => {
            if (err) console.log(err);
        });
    },
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allureCmd(['generate','--clean', allureTmpDirectory, '--output', allureReportDirectory])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                60000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                resolve()
            })
        })
    },
    afterTest: async function() {
        await browser.takeScreenshot();
    }
}
