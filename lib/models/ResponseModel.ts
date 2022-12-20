export interface IResponse {
    OK: boolean
    executionTime: number
    executionTimeUnit: string
}

export class OKResponseModel implements IResponse {

    constructor(executionTime: number, content: object[] = [], executionTimeUnit: string = "ms") {
        this.content = content;
        this.executionTime = executionTime;
        this.executionTimeUnit = executionTimeUnit;
        this.OK = true;
    }
    
    OK: boolean;
    executionTime: number;
    executionTimeUnit: string;

    content: Object[]
}

export class KOResponseModel implements IResponse {

    constructor(executionTime: number, error: Error = null, executionTimeUnit: string = "ms") {
        this.executionTime = executionTime;
        this.executionTimeUnit = executionTimeUnit;
        this.OK = false;

        this.errorName = error.name;
        this.errorMessage = error.message;
        this.errorStack = error.stack;

    }

    OK: boolean
    executionTime: number
    executionTimeUnit: string

    errorName: string
    errorMessage: string
    errorStack?: string

}