import { Process } from "./process.interface";

export class ProcessModel 
{
    private processCode: string;
    private processClassType: Process;

    constructor(processCode: string, processClassType: Process)
    {
        this.processCode = processCode;
        this.processClassType = processClassType;
    }
}

