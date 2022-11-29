import { ISQLTable } from './models/ISQLTable';
import { Contact } from './models/contact';
import { DbBuilder } from './dbBuilder';
import { Database } from 'sqlite3';
import { SQLiteHelper } from './sqliteHelper';

async function test(): Promise<void> {

    // Building database
    const tables: ISQLTable[] = [
        Contact
    ];
    const dbBuilder: DbBuilder = new DbBuilder("testDB.db", tables);
    const db: Database = dbBuilder.run();
    SQLiteHelper.init(db);

    console.log("START");
    let contacts: Contact[] = await SQLiteHelper.Instance.runQuery<Contact>("select * from contact where firstName = ?", "Marcel");
    console.log("contacts", contacts);
    console.log("OK?");
    
}

test();

setTimeout(() => {
    console.log("END");
}, 10000);