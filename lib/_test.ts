import { ISQLTable } from './models/ISQLTable';
import { Contact } from './models/contact';
import { DbBuilder } from './dbBuilder';
import { Database } from 'sqlite3';
import { SQLiteHelper } from './sqliteHelper';

const dbPath = "./testDB.db";

async function test(): Promise<boolean> {

    return new Promise<boolean>(async (resolve, reject) => {

        console.log("START");

        // Building database
        const tables: ISQLTable[] = [
            Contact
        ];
        console.log("A");
        const dbBuilder: DbBuilder = new DbBuilder(dbPath, tables);
        console.log("B");
        const db: Database = dbBuilder.run();
        console.log("C");
        SQLiteHelper.init(db);

        console.log("D");

        console.log("SQLiteHelper.Instance", SQLiteHelper.Instance);

        SQLiteHelper.Instance.runQuery<Contact>("select * from contact where firstName = ?", "Marcel").then((contacts: Contact[]) => {
            console.log("contacts", contacts);
            console.log("E");
            resolve(true);
        }).catch((err) => {
            console.error(err);
            reject();
        });
        
    })

}

let end: boolean = false;

test().then((res: boolean) => {
    end = res;
});

while (end) {
    // we wait ...
}

console.log("END");

var fs = require('fs');
fs.unlinkSync(dbPath);
