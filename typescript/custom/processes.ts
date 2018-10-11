import { injectable, inject, Container } from "inversify";
import { ProcessConfiguration } from "../configuration/process.configuration";
import TYPES from "../configuration/types";
import { ProcessModel } from "../common/process/process.model";
import { FieldMappedTextFileToCSVFileProces } from "./process/fieldmapped-text-to-csv.process";
import { Process } from "../common/process/process.interface";
import { CmdLineOptionDefinition } from "../cmdline/cmdline.optiondefinition";

export interface Processes
{

}

@injectable()
export class ProcessesImpl
{
    private _processConfiguration: ProcessConfiguration;
    
    constructor(@inject(TYPES.ProcessConfiguration) processConfiguration: ProcessConfiguration)
    {
        this._processConfiguration = processConfiguration;

        /**
         * Start - Add processes
         */

        this._processConfiguration.addProcess(
            new ProcessModel('PROCESS-01', 
            () : Container => 
            {
                let container = new Container();
                container.bind<Process>(TYPES.Process).to(FieldMappedTextFileToCSVFileProces);
                return container;
            },
            [
                new CmdLineOptionDefinition({ name: 'a', type: String}, true),
                new CmdLineOptionDefinition({ name: 'b', type: String}, false),
                new CmdLineOptionDefinition({ name: 'c', type: String}, false),
            ]),
        );

        this._processConfiguration.addProcess(
            new ProcessModel('PROCESS-02', 
            () : Container => 
            {
                let container = new Container();
                container.bind<Process>(TYPES.Process).to(FieldMappedTextFileToCSVFileProces);
                return container;
            },
            [
                new CmdLineOptionDefinition({ name: 'a', type: String}, true),
                new CmdLineOptionDefinition({ name: 'b', type: String}, false),
                new CmdLineOptionDefinition({ name: 'c', type: String}, false),
            ]),
        );

        this._processConfiguration.addProcess(
            new ProcessModel('PROCESS-03', 
            () : Container => 
            {
                let container = new Container();
                container.bind<Process>(TYPES.Process).to(FieldMappedTextFileToCSVFileProces);
                return container;
            },
            [
                new CmdLineOptionDefinition({ name: 'a', type: String}, true),
                new CmdLineOptionDefinition({ name: 'b', type: String}, false),
                new CmdLineOptionDefinition({ name: 'c', type: String}, false),
            ]),
        );

        /**
         * End - Add processes
         */
    }
}