// https://www.linode.com/docs/guides/getting-started-with-nodejs-sqlite/

var sqlite3 = require('sqlite3');
import { Database } from "sqlite3";
import { ISQLTable } from './models/ISQLTable';

export class DbBuilder{

    private _dbPath : string;
    private _tables : ISQLTable[];

    constructor (dbPath : string, tables : ISQLTable[]) {
        this._dbPath = dbPath;
        this._tables = tables;
    }

    public run() : Database {
        
        var db : Database = new sqlite3.Database(this._dbPath, sqlite3.OPEN_READWRITE, (err) => {
            if (err && err.code == "SQLITE_CANTOPEN") {
                this.createDatabase();
                return;
                } else if (err) {
                    console.log("Getting error " + err);
                    return;
            }
        });

        return db;

    }

    private createDatabase() {
        var newdb = new sqlite3.Database(this._dbPath, async (err) => {
            if (err) {
                console.log("Getting error " + err);
                return;
            }
            await this.createTables(newdb);
        });
    }

    private async createTables(newdb : Database) : Promise<void> {

        return new Promise<void>((resolve, reject) => {

            let query : string = "";

            this._tables.forEach(table => {
                query += table.toSQLCreateScript();
            });

            newdb.exec(query, (err: Error)  => {
                    if (err) {
                        reject(err);
                    }
            });

            resolve();

        })

        // newdb.exec(`
        // create table hero (
        //     hero_id int primary key not null,
        //     hero_name text not null,
        //     is_xman text not null,
        //     was_snapped text not null
        // );

        // insert into hero (hero_id, hero_name, is_xman, was_snapped)
        //     values (1, 'Spiderman', 'N', 'Y'),
        //            (2, 'Tony Stark', 'N', 'N'),
        //            (3, 'Jean Grey', 'Y', 'N');
    
        // create table hero_power (
        //     hero_id int not null,
        //     hero_power text not null
        // );
    
        // insert into hero_power (hero_id, hero_power)
        //     values (1, 'Web Slinging'),
        //            (1, 'Super Strength'),
        //            (1, 'Total Nerd'),
        //            (2, 'Total Nerd'),
        //            (3, 'Telepathic Manipulation'),
        //            (3, 'Astral Projection');
        //     `, ()  => {
        //         this.runQueries(newdb);
        // });
    }

    private runQueries(db : Database) {
        db.all(`
        select hero_name, is_xman, was_snapped from hero h
        inner join hero_power hp on h.hero_id = hp.hero_id
        where hero_power = ?`, "Total Nerd", (err, rows) => {
            rows.forEach(row => {
                console.log(row.hero_name + "\t" +
                row.is_xman + "\t" +
                row.was_snapped);
            });
        });
    }

}