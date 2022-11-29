import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import { DbBuilder } from './dbBuilder';
import { SQLiteHelper } from './sqliteHelper';
import { Database } from 'sqlite3';
import { Contact } from "./models/contact";
import { ISQLTable } from './models/ISQLTable';

const appConfig = require('./appConfig.json');

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();

    constructor() {

        this.config();

        // Building database
        const tables: ISQLTable[] = [
            Contact
        ];
        // TODO : Bordel asynchrone : ...
        const dbBuilder: DbBuilder = new DbBuilder(appConfig.sqlite.dbPath, tables);
        const db: Database = dbBuilder.run();
        SQLiteHelper.init(db);

        this.routePrv.routes(this.app);
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    }

}

export default new App().app;
