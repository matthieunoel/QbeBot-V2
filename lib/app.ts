import * as express from "express";
import * as bodyParser from "body-parser";
import { IndexRoutes } from "./routes/indexRoutes";
import { DATA } from './DATA';
import { Contact } from "./models/contactModel";
import { ISQLTable } from './models/ISQLTable';
import { ContactRoutes } from './routes/contactRoutes';
import { LOG } from "./log";

const appConfig: any = require('./appConfig.json');

// log4js.configure({
//     appenders: [
//         {
//             type: "clustered",
//             appenders: [
//             {
//                 type: "dateFile",
//                 filename: "log/access.log",
//                 pattern: "-yyyy-MM-dd",
//                 category: "http"
//             },
//             {
//                 type: "file",
//                 filename: "log/app.log",
//                 maxLogSize: 10485760,
//                 numBackups: 3
//             },
//             {
//                 type: "logLevelFilter",
//                 level: "ERROR",
//                 appender: {
//                 type: "file",
//                 filename: "log/errors.log"
//                 }
//             }
//             ]
//         }
//     ]
// });

class App {

    public app: express.Application = express();
    public indexRoutes: IndexRoutes = new IndexRoutes();
    public indexContact: ContactRoutes = new ContactRoutes();

    constructor() {

        this.config();

        // Building database
        const tables: ISQLTable[] = [
            Contact
        ];

        DATA.initDB(appConfig.sqlite.dbPath as string, tables);

        this.indexRoutes.routes(this.app);
        this.indexContact.routes(this.app);
    }

    private config(): void{

        LOG.initLogger({
            appenders: {
                mainFile: {
                    type: "file",
                    filename: "log/app.log",
                    maxLogSize: 10485760,
                    numBackups: 3
                }
            },
            categories: {
                default: { 
                    appenders: ["mainFile"], 
                    level: require("./appConfig.json").env.toLowerCase() == "dev" ? "trace" : "info"
                }
            },
        });       

        const jsonErrorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify(err));
        }

        this.app.set('json spaces', 2);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static('public'));
        this.app.use(jsonErrorHandler);
    }

}

export default new App().app;
