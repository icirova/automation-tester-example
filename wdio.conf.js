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
    },{
        maxInstances: 10,
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: ['-headless', '-width=1920', '-height=1080'], 
            prefs: {
                'browser.download.folderList': 2,
                'browser.download.dir': '/tmp/downloads',
                'browser.helperApps.neverAsk.saveToDisk': 'application/pdf',
            },
        },
        acceptInsecureCerts: true, 
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
        timeout: 60000,
        retries: 3
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
                5000)

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
