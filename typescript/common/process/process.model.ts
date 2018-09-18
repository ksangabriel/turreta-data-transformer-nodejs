import { Process } from "./process.interface";
import { CmdLineOptionDefinition } from "../../cmdline/cmdline.optiondefinition";

export class ProcessModel
{
    private processCode: string;
    private processClassType: any;

    /**
     * Process-specific custom command-line parameters
     */
    private processCmdLineOptionDefinitions: Array<CmdLineOptionDefinition>;

    constructor(processCode: string, 
        processClassType: any, processCmdLineOptionDefinitions?: Array<CmdLineOptionDefinition>)
    {
        this.processCode = processCode;
        this.processClassType = processClassType;
        this.processCmdLineOptionDefinitions = processCmdLineOptionDefinitions;
    }

    public getProcessCode(): string
    {
        return this.processCode;
    }

    public getProcessClassType(): Process
    {
        return this.processClassType;
    }

}

