import { ProcessModel } from "../common/process/process.model";
import { injectable } from "inversify";

/**
 * Contract - Configuration of all process models
 */
export interface ProcessConfiguration
{
    /**
     * Adds each process to the configuration
     * @param processModel 
     */
    addProcess(processModel: ProcessModel): void;

    getProcessList(): Array<ProcessModel>;
}

/**
 * Implementation - Configuration of all process models
 */
@injectable()
export class ProcessConfigurationImpl
{
    /**
     * List of process models
     */
    private processList: Array<ProcessModel> = [];

    /**
     * Adds each process to the configuration
     * @param processModel 
     */
    addProcess(processModel: ProcessModel): void
    {
        this.processList.push(processModel);
    }

    getProcessList(): Array<ProcessModel>
    {
        return this.processList;
    }

    /**
     * Process Definitions
     */
    // private processList: Array<ProcessModel> = [
        // new ProcessModel('PROCESS-01', 
        //     () : Container => 
        //     {
        //         let container = new Container();
        //         container.bind<Process>(TYPES.Process).to(FieldMappedTextFileToCSVFileProces);
        //         return container;
        //     },
        //     [
        //         new CmdLineOptionDefinition({ name: 'a', type: String}, true),
        //         new CmdLineOptionDefinition({ name: 'b', type: String}, false),
        //         new CmdLineOptionDefinition({ name: 'c', type: String}, false),
        //     ]),
    // ];

    // public getConfig(): any
    // {
    //     let config = {
    //         processList: this.processList
    //     };

    //     return config;
    // }
}