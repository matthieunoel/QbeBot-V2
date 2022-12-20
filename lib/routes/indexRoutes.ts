import {Application, Request, Response} from "express";
import { OKResponseModel } from "../models/ResponseModel";
import { BaseRoute } from './_baseRoute';

export class IndexRoutes extends BaseRoute {
    
    public routes(app: Application): void {   
        
        app.route('/')
        .get(IndexRoutes.requestPublic, (req: Request, res: Response) => {      
            const startTime = Date.now();      
            res.status(200).send(
                new OKResponseModel(
                    Date.now() - startTime,
                    {
                        appName: require('../appConfig').name,
                        appVersion: require('../../package.json').version,
                        appDescription: require('../../package.json').description
                    }
                )
            )
        })

    }
}