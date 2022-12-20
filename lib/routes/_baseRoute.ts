import { NextFunction, Request, Response } from "express";

export class BaseRoute {
    
    protected static requestPublic(req: Request, res: Response, next: NextFunction) {
        console.log(`Request : ${req.method} ${req.originalUrl}`);
        if (req.body != undefined) {
            console.log("Request Body :", req.body);
        }
        next();
    }

    protected static requestWithAuth(req: Request, res: Response, next: NextFunction) {
        console.log(`Request : ${req.method} ${req.originalUrl}`);
        if (req.body != undefined) {
            console.log("Request Body :", req.body);
        }
        next();
    }
}