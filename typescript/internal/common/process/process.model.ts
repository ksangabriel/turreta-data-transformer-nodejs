import { Process } from "./process.interface";
import { CmdLineOptionDefinition } from "../../cmdline/cmdline.optiondefinition";
import { Container } from "inversify";
import TYPES from "../../configuration/types";

export class ProcessModel
{
    private _processCode: string;
    private _processContainer: () => Container;

    /**
     * Process-specific custom command-line parameters
     */
    private _processCmdLineOptionDefinitions: Array<CmdLineOptionDefinition>;

    constructor(processCode: string, processClassType: any, 
        processCmdLineOptionDefinitions: {name: string, type: string, mandatory: boolean}[])
    {
        this._processCmdLineOptionDefinitions = [];

        let tmp = this._processCmdLineOptionDefinitions;
        processCmdLineOptionDefinitions.forEach(function(v){
            tmp.push(
                new CmdLineOptionDefinition({ name: v.name, type: String}, v.mandatory)
            );
        });


        this._processCode = processCode;      
        
        this._processContainer = () : Container => 
        {
            let container = new Container();
            container.bind<Process>(TYPES.Process).to(processClassType);
            return container;
        };
    }

    public getProcessCode(): string
    {
        return this._processCode;
    }

    public getprocessCmdLineOptionDefinitions(): Array<CmdLineOptionDefinition>
    {
        return this._processCmdLineOptionDefinitions;
    }

    public getContainer(): Container
    {
        return this._processContainer();
    }

}

