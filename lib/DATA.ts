import { ISQLTable } from './../lib/models/ISQLTable';
import { Database } from 'better-sqlite3';

const Database: Database = require('better-sqlite3');
const fs = require('fs');

export class DATA {

    private static _dbPath: string = "";

    private static _sqliteDB: Database = null;

    public static get SQLiteDB(): Database
    {

        if (this._dbPath == "") {
            throw new Error(typeof DATA+" haven't been init yet.");
        }

        if (this._sqliteDB == null || !this._sqliteDB.open) {
            this._sqliteDB = new Database(this._dbPath, { verbose: console.log, fileMustExist: true });    
        }
        
        return this._sqliteDB;

    }

    public static initDB(dbPath: string, tables: ISQLTable[]) {

        if (!fs.existsSync(dbPath)) {

            let db: Database;

            try {
                console.log("Creating database ...");

                db = new Database(dbPath, { verbose: console.log });

                let query : string = "";
                tables.forEach(table => {
                    query += table.toSQLCreateScript().replace(/\r?\n|\r/g, " ").replace(/  +/g, ' ');
                });

                db.exec(query);

                db.close();

                console.log("Database creation ok.");
            } catch (error: any) {
                console.error(error);
                try {
                    db.close();
                } catch (closingError: any) {
                    console.error(closingError);
                }
                throw error as Error;
            }

        }

        DATA._dbPath = dbPath;
    
    }

}