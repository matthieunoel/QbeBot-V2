import { Contact } from '../models/contactModel';
import { Request, Response } from 'express';
import { DATA } from '../DATA';

export class ContactController{

    public static GET_Contacts (req: Request, res: Response) {

        // if (typeof req.query.id != "undefined") {
        //     this.GET_Contacts_ById(req, res);
        // }
        // else {
        //     this.GET_Contacts_All(req, res);
        // }

        res.json({response: "Eeeeeeeeeh ... WIP"});

    }

    public static GET_Contacts_All(req: Request, res: Response) {
        let contacts: any = DATA.SQLiteDB.prepare("SELECT * FROM contact").all() as Contact[];
        DATA.SQLiteDB.close();
        res.json(contacts);
        res.send();
    }
    
    public static GET_Contacts_ById (req: Request, res: Response) {

        let contact: any = DATA.SQLiteDB.prepare("SELECT * FROM contact WHERE id = ?").get(req.params.Id) as Contact;
        DATA.SQLiteDB.close();

        if (contact == undefined) {
            // res.statusMessage = "No Contact was found.";
            return res.status(204).end();
        }

        res.json(contact);

        res.send();

    }

}