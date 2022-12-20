import { ContactController } from "../controllers/contactController";
import {Request, Response, NextFunction, Application} from "express";

export class ContactRoutes {
    
    public async routes(app: Application): Promise<void> {
        
        // Contact 
        app.get('/contacts',
        (req: Request, res: Response, next: NextFunction) => {
            console.log(`Request : ${req.method} ${req.originalUrl}`);
            next();                      
        }, ContactController.GET_Contacts_All);

        app.get('/contacts/:Id', 
        (req: Request, res: Response, next: NextFunction) => {
            console.log(`Request : ${req.method} ${req.originalUrl}`);
            next();                      
        }, ContactController.GET_Contacts_ById);

        app.post('/contacts/', 
        (req: Request, res: Response, next: NextFunction) => {
            console.log(`Request : ${req.method} ${req.originalUrl}`);
            console.log('Request body :', req.body);
            next();                      
        }, ContactController.POST_Contacts);

        // app.param('contactId', function(req: Request, res: Response, next: NextFunction, contactId: string) {

        //     if (!isNaN(parseInt(contactId))) {
        //         res.json(new Error("Contact ID is not a valid number."));
        //         res.send();
        //     }
        //     else {
        //         req.body.contactId = contactId;
        //         console.log(req.body);
        //         next();
        //     }

        // });

        // app.route('/contacts/:contactId')
        // .get((req: Request, res: Response, next: NextFunction) => {
        //     console.log(`Request from: ${req.originalUrl}`);
        //     console.log(`Request type: ${req.method}`);
        //     next();                      
        // }, ContactController.GET_Contacts)  

        // // Contact 
        // app.route('/contact')
        // .get((req: Request, res: Response, next: NextFunction) => {
        //     // middleware
        //     console.log(`Request from: ${req.originalUrl}`);
        //     console.log(`Request type: ${req.method}`);            
        //     // if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){
        //     //     res.status(401).send('You shall not pass!');
        //     // } else {
        //     //     next();
        //     // }                        
        // }, ContactController.get)      
        
        // POST endpoint
        // .post(/*this.contactController.addNewContact*/);

        // // Contact detail
        // app.route('/contact/:contactId')
        // // get specific contact
        // .get(this.contactController.getContactWithID)
        // .put(this.contactController.updateContact)
        // .delete(this.contactController.deleteContact)

    }
}