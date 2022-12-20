export interface IResponse {
    OK: boolean
    executionTime: number
    executionTimeUnit: string
}

export class OKResponseModel implements IResponse {

    constructor(executionTime: number, content: any, maxRow:number = null, executionTimeUnit: string = "ms") {
        this.content = content;
        this.executionTime = executionTime;
        this.executionTimeUnit = executionTimeUnit;
        this.OK = true;

        if (maxRow == undefined && Array.isArray(content)) {
            this.maxRow = 1;
        }
        else if(maxRow != undefined) {
            this.maxRow = maxRow;
        }

    }
    
    OK: boolean;
    executionTime: number;
    executionTimeUnit: string;

    content: any
    maxRow?: number
}

export class KOResponseModel implements IResponse {

    constructor(executionTime: number, error: Error, executionTimeUnit: string = "ms") {
        this.executionTime = executionTime;
        this.executionTimeUnit = executionTimeUnit;
        this.OK = false;

        this.errorName = error.name;
        this.errorMessage = error.message;
        
        if (require("../appConfig").env.toLowerCase() == "dev") {
            this.errorStack = error.stack;
        }

    }

    OK: boolean
    executionTime: number
    executionTimeUnit: string

    errorName: string
    errorMessage: string
    errorStack?: string

}