import { injectable, inject, Container } from "inversify";
import { AppConfiguration } from "../../configuration/app.configuration";
import TYPES from "../../configuration/types";
import { Process } from "./process.interface";
import { CommandLineOptions } from "command-line-args";
import { ProcessConfiguration } from "../../configuration/process.configuration";
import { ProcessModel } from "./process.model";
import { ContainerContainer } from "../container/container-container";

export interface ProcessController
{
    delegate(cmdLineOptions: CommandLineOptions);
}

@injectable()
export class ProcessControllerImpl implements ProcessController
{
    private _appConfiguration: AppConfiguration;
    private _processConfiguration: ProcessConfiguration;

    constructor(@inject(TYPES.AppConfiguration) appConfiguration: AppConfiguration,
        @inject(TYPES.ProcessConfiguration) processConfiguration: ProcessConfiguration)
    {
        this._appConfiguration = appConfiguration;
        this._processConfiguration = processConfiguration;
    }

    public delegate(cmdLineOptions: CommandLineOptions)
    {
        let processModelList: Array<ProcessModel> = this._processConfiguration.getProcessList();
    
        for (let processModel of processModelList) {
          if (processModel.getProcessCode() === cmdLineOptions['process-code']) {
            console.log("Found!");
          }
        }
    

    

        // process.execute(cmdLineOptions);
    }

}