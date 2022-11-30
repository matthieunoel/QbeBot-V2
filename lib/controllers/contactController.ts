import { Contact } from '../models/contactModel';
import { Request, Response } from 'express';
import { DATA } from '../DATA';

export class ContactController{

    // public addNewContact (req: Request, res: Response) {                
    //     let newContact = new Contact(req.body);
    
    //     // BUS

    //     // TODO

    //     //DAL
        


    //     // newContact.save((err, contact) => {
    //     //     if(err){
    //     //         res.send(err);
    //     //     }    
    //     //     res.json(contact);
    //     // });
    // }

    public static getContacts (req: Request, res: Response) {

        console.log("CALL getContacts");

        let contacts: any = DATA.SQLiteDB.prepare("SELECT * FROM contact").all() as Contact[];
        DATA.SQLiteDB.close();
        res.json(contacts);

        res.send();

    }

    // public getContactWithID (req: Request, res: Response) {           
    //     Contact.findById(req.params.contactId, (err, contact) => {
    //         if(err){
    //             res.send(err);
    //         }
    //         res.json(contact);
    //     });
    // }

    // public updateContact (req: Request, res: Response) {           
    //     Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
    //         if(err){
    //             res.send(err);
    //         }
    //         res.json(contact);
    //     });
    // }

    // public deleteContact (req: Request, res: Response) {           
    //     Contact.remove({ _id: req.params.contactId }, (err, contact) => {
    //         if(err){
    //             res.send(err);
    //         }
    //         res.json({ message: 'Successfully deleted contact!'});
    //     });
    // }
    
}