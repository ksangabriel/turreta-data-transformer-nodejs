import { injectable, inject } from "inversify";
import { AppConfiguration } from "../../configuration/app.configuration";
import TYPES from "../../configuration/types";
import { Process } from "./process.interface";
import { CommandLineOptions } from "command-line-args";

export interface ProcessController
{
    delegate(cmdLineOptions: CommandLineOptions, process: Process);
}

@injectable()
export class ProcessControllerImpl implements ProcessController
{
    private _appConfiguration: AppConfiguration;

    constructor(@inject(TYPES.AppConfiguration) appConfiguration: AppConfiguration)
    {
        this._appConfiguration = appConfiguration;
    }

    public delegate(cmdLineOptions: CommandLineOptions, process: Process)
    {
        process.execute(cmdLineOptions);
    }

}