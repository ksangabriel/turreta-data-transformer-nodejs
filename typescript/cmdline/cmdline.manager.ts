import { CmdLineOptionDefinition } from "./cmdline.optiondefinition";
import commandLineArgs = require('command-line-args');
import { injectable, inject } from "inversify";
import TYPES from "../configuration/types";
import { AppConfiguration } from "../configuration/app.configuration";
import { ProcessConfiguration } from "../configuration/process.configuration";
import { ProcessModel } from "../common/process/process.model";

export interface CmdLineManager
{
    validateMandatory(checkAgainst: commandLineArgs.CommandLineOptions);

    getCmdLineOptionDefinitions():  Array<CmdLineOptionDefinition>;

    getNoMandatoryFlagCmdLineOptionDefinitions(): Array<commandLineArgs.OptionDefinition>;
} 

@injectable()
export class CmdLineManagerImpl implements CmdLineManager
{
     private _appConfiguration: AppConfiguration;
     private _processConfiguration: ProcessConfiguration;


    // Default global parameters
    cmdLineOptionDefinitions: Array<CmdLineOptionDefinition>;

    constructor(@inject(TYPES.AppConfiguration) appConfiguration: AppConfiguration,
                @inject(TYPES.ProcessConfiguration) processConfiguration: ProcessConfiguration)
    {
        this._appConfiguration = appConfiguration;
        this._processConfiguration = processConfiguration;
        this.cmdLineOptionDefinitions = this._appConfiguration.getConfig().customCmdLineOptionDefinition;
    }
    
    getCmdLineOptionDefinitions():  Array<CmdLineOptionDefinition>
    {
        return this.cmdLineOptionDefinitions;
    }

    getNoMandatoryFlagCmdLineOptionDefinitions(): Array<commandLineArgs.OptionDefinition>
    {
        let optionDefinitionsWithNoMandatoryFlag: commandLineArgs.OptionDefinition[] = [];

        for (let option of this.getCmdLineOptionDefinitions()) {
            optionDefinitionsWithNoMandatoryFlag.push(option.getOptionDefinition());
        }
    
        return optionDefinitionsWithNoMandatoryFlag;
    }

    /**
     * Validate provided CLI parameters in checkAgainst against cmdLineOptionDefinitions
     * 
     * @param otherCmdLineOptionDefinitions 
     * @param checkAgainst 
     */
    validateMandatory(checkAgainst: commandLineArgs.CommandLineOptions): void
    {
        let clonedTempArray: Array<CmdLineOptionDefinition> = this.cmdLineOptionDefinitions;

        let processModelArray: Array<ProcessModel> = this._processConfiguration.getConfig().processList;


        let fnGetProcessModel = function(pocessModels: Array<ProcessModel>, processCode: string)
        {
            let f = function(e)
            {
                return e.getProcessCode() === processCode;
            }
            return pocessModels.find(f);
        }
        
       
        let processModel: ProcessModel = fnGetProcessModel(processModelArray, checkAgainst['process-code'])


        /* Concat global param options and process-specific param options */
        for(let option of clonedTempArray.concat(processModel.getprocessCmdLineOptionDefinitions()))
        {
            if(option.getMandatory())
            {
                if(checkAgainst[option.getOptionDefinition().name] == null)
                {
                    throw Error(option.getOptionDefinition().name + ' is mandatory but not provided!');
                }
            }
        }
    }
}
