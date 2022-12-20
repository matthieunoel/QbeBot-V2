import { ContactController } from "../controllers/contactController";
import {Request, Response, NextFunction, Application} from "express";

export class ContactRoutes {
    
    private static requestAuth(req: Request, res: Response, next: NextFunction) {
            console.log(`Request : ${req.method} ${req.originalUrl}`);
            if (req.body != undefined) {
                console.log("Request Body :", req.body);
            }
            next();
    }

    public async routes(app: Application): Promise<void> {
        
        // Contact 
        app.get('/contacts', ContactRoutes.requestAuth, ContactController.GET_Contacts_All);

        app.get('/contacts/:Id', ContactRoutes.requestAuth, ContactController.GET_Contacts_ById);

        app.post('/contacts/', ContactRoutes.requestAuth, ContactController.POST_Contacts);

        app.put('/contacts/:Id', ContactRoutes.requestAuth, ContactController.PUT_Contacts);

        app.patch('/contacts/:Id', ContactRoutes.requestAuth, ContactController.PATCH_Contacts);

        app.delete('/contacts/:Id', ContactRoutes.requestAuth, ContactController.DELETE_Contacts);

    }
}