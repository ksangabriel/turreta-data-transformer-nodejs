import { ProcessModel } from "../common/process/process.model";
import { Container, injectable } from "inversify";
import { Process } from "../common/process/process.interface";
import TYPES from "./types";
import { FieldMappedTextFileToCSVFileProces } from "../custom/process/fieldmapped-text-to-csv.process";

export interface ProcessConfiguration
{

}

@injectable()
export class ProcessConfigurationImpl
{
    /**
     * Process Definitions
     */
    private processList: Array<ProcessModel> = [
        new ProcessModel('PROCESS-01', 
            () : Container => 
            {
                let container = new Container();
                container.bind<Process>(TYPES.Process).to(FieldMappedTextFileToCSVFileProces);
                return container;
            },
            [
                // new CmdLineOptionDefinition({ name: 'a', type: String}, true),
                // new CmdLineOptionDefinition({ name: 'b', type: String}, true),
                // new CmdLineOptionDefinition( { name: 'c', type: String}, true),
            ]),
    ];

    public getConfig(): any
    {
        let config = {
            processList: this.processList
        };

        return config;
    }
}