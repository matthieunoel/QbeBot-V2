import * as express from "express";
import * as bodyParser from "body-parser";
import { IndexRoutes } from "./routes/indexRoutes";
import { DATA } from './DATA';
import { Contact } from "./models/contactModel";
import { ISQLTable } from './models/ISQLTable';
import { ContactRoutes } from './routes/contactRoutes';

const appConfig: any = require('./appConfig.json');

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

        const jsonErrorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify(err));
        }

        this.app.set('json spaces', 2);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
        this.app.use(jsonErrorHandler);
    }

}

export default new App().app;
