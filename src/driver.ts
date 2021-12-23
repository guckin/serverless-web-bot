import {Builder, WebDriver} from 'selenium-webdriver';
import {Options, ServiceBuilder, setDefaultService} from 'selenium-webdriver/chrome';
import {UnaryAsyncFn} from './utility';

export type Driver = {
    readonly goTo: UnaryAsyncFn<string, void>;
    readonly getUrl: UnaryAsyncFn<void, string>;
};

export type ChromeArguments =
    Argument<'headless'> |
    Argument<'no-sandbox'> |
    Argument<'disable-dev-shm-usage'> |
    Argument<'disable-gpu'> |
    Argument<'disable-dev-tools'> |
    Argument<'no-zygote'> |
    Argument<'single-process'> |
    Argument<'user-data-dir', string> |
    Argument<'remote-debugging-port', `${number}`>;

export type Argument<A extends string, B extends string | void = void> = B extends string ? `--${A}=${B}`: `--${A}`;

export type SeleniumDriverOptions = {
    readonly type: 'chrome';
    readonly chromeArguments: ChromeArguments[];
    readonly binaryPath: string;
    readonly driverPath: string;
};

export class SeleniumDriver implements Driver {

    static readonly create = (
        {
            chromeArguments,
            binaryPath,
            driverPath
        }: SeleniumDriverOptions
    ) => async (): Promise<Driver> => {
        const options = new Options().addArguments(...chromeArguments).setChromeBinaryPath(binaryPath);
        const service = new ServiceBuilder(driverPath).build();
        setDefaultService(service);
        const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        return new SeleniumDriver(driver);
    };

    private constructor(private readonly seleniumDriver: WebDriver) {}

    readonly goTo = (page: string): Promise<void> => this.seleniumDriver.get(page);
    
    readonly getUrl = (): Promise<string> => this.seleniumDriver.getCurrentUrl(); 
}

