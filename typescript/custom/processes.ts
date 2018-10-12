import { injectable, inject, Container } from "inversify";
import { ProcessConfiguration } from "../configuration/process.configuration";
import TYPES from "../configuration/types";
import { ProcessModel } from "../common/process/process.model";
import { FieldMappedTextFileToCSVFileProcess } from "./process/fieldmapped-text-to-csv.process";

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
            new ProcessModel('PROCESS-01', FieldMappedTextFileToCSVFileProcess,
            [
                { name: 'a', type: 'string', mandatory: true},
                { name: 'b', type: 'string', mandatory: false},
                { name: 'c', type: 'string', mandatory: false},
            ]),
        );

        this._processConfiguration.addProcess(
            new ProcessModel('PROCESS-02', FieldMappedTextFileToCSVFileProcess,
           [
                { name: 'a', type: 'string', mandatory: true},
                { name: 'b', type: 'string', mandatory: false},
                { name: 'c', type: 'string', mandatory: false},
            ]),
        );

        this._processConfiguration.addProcess(
            new ProcessModel('PROCESS-03', FieldMappedTextFileToCSVFileProcess,
            [
                { name: 'a', type: 'string', mandatory: true},
                { name: 'b', type: 'string', mandatory: false},
                { name: 'c', type: 'string', mandatory: false},
            ]),
        );

        /**
         * End - Add processes
         */
    }
}