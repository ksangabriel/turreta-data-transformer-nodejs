import { injectable, inject } from "inversify";
import { ProcessConfiguration } from "../internal/configuration/process.configuration";
import TYPES from "../internal/configuration/types";
import { ProcessModel } from "../internal/common/process/process.model";
import { CSVToCSVToUpperTextProcess } from "./process/csv-to-csv-toupper.process";
import { FieldMappedTextFileToCSVFileProcess } from "./process/fieldmapped-text-to-csv.process.1";

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
            new ProcessModel('PROCESS-02', CSVToCSVToUpperTextProcess,
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