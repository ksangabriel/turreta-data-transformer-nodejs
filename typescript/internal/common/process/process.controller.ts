import { injectable, inject } from "inversify";
import TYPES from "../../configuration/types";
import { Process } from "./process.interface";
import { CommandLineOptions } from "command-line-args";
import { ProcessConfiguration } from "../../configuration/process.configuration";
import { ProcessModel } from "./process.model";
import { ContainerContainer } from "../container/container-container";

export interface ProcessController
{
    delegate(cmdLineOptions: CommandLineOptions): void;
}

@injectable()
export class ProcessControllerImpl implements ProcessController
{
    private _processConfiguration: ProcessConfiguration;

    constructor(@inject(TYPES.ProcessConfiguration) processConfiguration: ProcessConfiguration)
    {
        this._processConfiguration = processConfiguration;
    }

    public delegate(cmdLineOptions: CommandLineOptions)
    {
        let processModelList: Array<ProcessModel> = this._processConfiguration.getProcessList();
    
        for (let processModel of processModelList) {
          if (processModel.getProcessCode() === cmdLineOptions['process-code']) {
            
            let process: Process = ContainerContainer.instance.get<Process>(TYPES.Process);


            console.log("Found!" + process.getName());
          }
        }
    }
}