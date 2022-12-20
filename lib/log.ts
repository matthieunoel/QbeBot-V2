export class LOG {

    public static initLogger(conf: object) {

        const log4js = require("log4js");

        log4js.configure(conf);

        const logger = log4js.getLogger(require("../package.json").name);

        const baseConsoleTrace = console.trace;
        console.trace = (...msg: any[]) => {
            baseConsoleTrace(...msg);
            logger.trace(...msg);
        };

        const baseConsoleDebug = console.debug;
        console.debug = (...msg: any[]) => {
            baseConsoleDebug(...msg);
            logger.debug(...msg);
        };

        const baseConsoleInfo = console.info;
        console.info = (...msg: any[]) => {
            baseConsoleInfo(...msg);
            logger.log(...msg);
        };

        const baseConsoleLog = console.log;
        console.log = (...msg: any[]) => {
            baseConsoleLog(...msg);
            logger.log(...msg);
        };

        const baseConsoleWarn = console.warn;
        console.warn = (...msg: any[]) => {
            baseConsoleWarn(...msg);
            logger.warn(...msg);
        };

        const baseConsoleError = console.error;
        console.error = (...msg: any[]) => {
            baseConsoleError(...msg);
            logger.error(...msg);
        };

    }

} 