import { ContactController } from "../controllers/contactController";
import { Application } from "express";
import { BaseRoute } from './_baseRoute';

export class ContactRoutes extends BaseRoute  {

    public async routes(app: Application): Promise<void> {
        
        // Contact 
        app.get('/contacts', ContactRoutes.requestWithAuth, ContactController.GET_Contacts_All);

        app.get('/contacts/:Id', ContactRoutes.requestWithAuth, ContactController.GET_Contacts_ById);

        app.post('/contacts/', ContactRoutes.requestWithAuth, ContactController.POST_Contacts);

        app.put('/contacts/:Id', ContactRoutes.requestWithAuth, ContactController.PUT_Contacts);

        app.patch('/contacts/:Id', ContactRoutes.requestWithAuth, ContactController.PATCH_Contacts);

        app.delete('/contacts/:Id', ContactRoutes.requestWithAuth, ContactController.DELETE_Contacts);

    }
}