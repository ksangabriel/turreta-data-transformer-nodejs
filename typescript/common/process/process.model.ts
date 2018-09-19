import { Process } from "./process.interface";
import { CmdLineOptionDefinition } from "../../cmdline/cmdline.optiondefinition";
import { Container } from "inversify";

export class ProcessModel
{
    private processCode: string;
    private processContainer: () => Container;

    /**
     * Process-specific custom command-line parameters
     */
    private processCmdLineOptionDefinitions: Array<CmdLineOptionDefinition>;

    constructor(processCode: string, 
        processClassType: () => Container, processCmdLineOptionDefinitions?: Array<CmdLineOptionDefinition>)
    {
        this.processCode = processCode;
        this.processCmdLineOptionDefinitions = processCmdLineOptionDefinitions;
        this.processContainer = processClassType;
    }

    public getProcessCode(): string
    {
        return this.processCode;
    }

    public getContainer(): Container
    {
        return this.processContainer();
    }

}

