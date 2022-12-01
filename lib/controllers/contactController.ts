import { Contact } from '../models/contactModel';
import { Request, Response } from 'express';
import { DATA } from '../DATA';

export class ContactController{

    public static GET_Contacts (req: Request, res: Response) {

        if (typeof req.query.id != "undefined") {
            this.GET_Contacts_ById(req, res);
        }
        else {
            this.GET_Contacts_All(req, res);
        }

    }

    private static GET_Contacts_All(req: Request, res: Response) {
        let contacts: any = DATA.SQLiteDB.prepare("SELECT * FROM contact").all() as Contact[];
        DATA.SQLiteDB.close();
        res.json(contacts);
        res.send();
    }
    
    private static GET_Contacts_ById (req: Request, res: Response) {

        console.log("req.query :", req.query);

        let contact: any = DATA.SQLiteDB.prepare("SELECT * FROM contact WHERE id = ?").get(req.query.id) as Contact;
        DATA.SQLiteDB.close();
        res.json(contact);

        res.send();

    }

}