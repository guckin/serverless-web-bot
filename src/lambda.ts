import {HandlerFactory} from './handler';
import {SeleniumDriver, SeleniumDriverOptions} from './driver';

const options: SeleniumDriverOptions = {
    type: 'chrome',
    chromeArguments: [
        '--headless',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-dev-tools',
        '--no-zygote',
        '--single-process',
        '--user-data-dir=/tmp/chrome-user-data',
        '--remote-debugging-port=9222',
    ],
    binaryPath: '/opt/chrome/chrome',
    driverPath: '/opt/chromedriver/chromedriver'
};
const initDriver = SeleniumDriver.create(options);
export const {handler} = new HandlerFactory(initDriver);
