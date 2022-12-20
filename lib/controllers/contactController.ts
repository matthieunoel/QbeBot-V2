import { Contact } from '../models/contactModel';
import { Request, Response } from 'express';
import { DATA } from '../DATA';
import { OKResponseModel, KOResponseModel } from './../models/ResponseModel';
import { Statement } from 'better-sqlite3';

export class ContactController {

    public static GET_Contacts_All(req: Request, res: Response) {
        const startTime = Date.now();

        try {

            let whereStatements: string[] = [];
            let whereArgs: any[] = [];

            if (req.query.firstName != undefined) {
                whereStatements.push("firstName = ?");
                whereArgs.push(req.query.firstName);
            }
            if (req.query.lastName != undefined) {
                whereStatements.push("lastName = ?");
                whereArgs.push(req.query.lastName)
            }

            const whereStatement: string =  whereStatements.length > 0 ? " WHERE " + whereStatements.join(' AND ') : "";

            const statement: Statement = DATA.SQLiteDB.prepare("SELECT * FROM contact" + whereStatement);

            let contacts: any = statement.all(whereArgs) as Contact[];
            DATA.SQLiteDB.close();

            return res.json(new OKResponseModel(
                Date.now() - startTime,
                contacts
            )).send();

        } catch (error: any) {
            res.status(500).json(new KOResponseModel(
                Date.now() - startTime,
                error as Error
            )).end();
        }

    }

    public static GET_Contacts_ById(req: Request, res: Response) {
        const startTime = Date.now();

        try {

            let contact: any = DATA.SQLiteDB.prepare("SELECT * FROM contact WHERE id = ?").get(req.params.Id) as Contact;
            DATA.SQLiteDB.close();

            if (contact == undefined) {
                // res.statusMessage = "No Contact was found.";
                return res.status(204).end();
            }

            res.json(new OKResponseModel(
                Date.now() - startTime,
                contact
            ));

            res.send();

        } catch (error) {
            res.status(500).json(new KOResponseModel(
                Date.now() - startTime,
                error as Error
            )).end()
        }

    }

    public static POST_Contacts(req: Request, res: Response) {
        const startTime = Date.now();

        try {

            let contact: Contact = req.body as Contact;

            const stmt: Statement = DATA.SQLiteDB.prepare('INSERT INTO contact (firstName, lastName) VALUES (?, ?)');
            const info: any = stmt.run(contact.firstName, contact.lastName); // https://github.com/WiseLibs/better-sqlite3/blob/HEAD/docs/api.md#runbindparameters---object
            contact.id = info.lastInsertRowid as number;
            DATA.SQLiteDB.close();

            return res.json(new OKResponseModel(
                Date.now() - startTime,
                [contact]
            )).send();

        } catch (error) {
            res.status(500).json(new KOResponseModel(
                Date.now() - startTime,
                error as Error
            )).end()
        }
    }

}