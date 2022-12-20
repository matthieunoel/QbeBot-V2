import { NextFunction, Request, Response } from "express";
import { KOResponseModel } from './../models/ResponseModel';

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

        const apiKeys: string[] = require("../appConfig").apiKeys as string[];
        const givenKey: string = req.headers["authorization"];

        if (!apiKeys.includes(givenKey)) {
            return res.status(401).json(
                new KOResponseModel(
                    -1,
                    new Error("Bad token.")
                )
            ).send().end();
        }
        else {
            next();
        }
    }
}