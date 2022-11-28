// Classe singleton qui permet de faire des requêtes à la base de données.

// https://stackoverflow.com/questions/30174078/how-to-define-singleton-in-typescript

var sqlite3 = require('sqlite3');
import { Database } from "sqlite3";

export class SQLiteHelper{

    private static _instance: SQLiteHelper = null;

    public static get Instance()
    {
        if (this._instance == null) {
            throw new Error("SQLiteHelper haven't been init yet.");
        }
        return this._instance;
    }

    public static init(db: Database) {
        SQLiteHelper._instance = new SQLiteHelper(db);
    }


    private _db: Database;

    constructor(db: Database) {
        this._db = db;
    }

    // Not sure of the syntax ...
    public async runQuery<T>(sql: string, params: any): Promise<T[]> {

        // sql = `select hero_name, is_xman, was_snapped from hero h
        //     inner join hero_power hp on h.hero_id = hp.hero_id
        //     where hero_power = ?`;
        // params = "Total Nerd";

        return new Promise<T[]>(async (resolve, reject) => {

            await this._db.all(sql, params, (err: Error, rows: any[]) => {

                if (err) {
                    reject(err);
                }

                else {

                    let res: T[] = [];
                    rows.forEach((row: any) => {
                        res.push(row as T);
                    });
                    resolve(res);

                }

            });

        })
    }

}