import { injectable, inject } from "inversify";
import { AppConfiguration } from "../../configuration/app.configuration";
import TYPES from "../../configuration/types";

export interface ProcessController
{

}

@injectable()
export class ProcessControllerImpl implements ProcessController
{
    private _appConfiguration: AppConfiguration;

    constructor(@inject(TYPES.AppConfiguration) appConfiguration: AppConfiguration)
    {
        this._appConfiguration = appConfiguration;
    }

}