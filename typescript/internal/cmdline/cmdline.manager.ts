import { CmdLineOptionDefinition } from "./cmdline.optiondefinition";
import commandLineArgs = require('command-line-args');
import { injectable, inject } from "inversify";
import { AppConfiguration } from "../configuration/app.configuration";
import { ProcessConfiguration } from "../configuration/process.configuration";
import { ProcessModel } from "../common/process/process.model";
import TYPES from "../configuration/types";
import { Processes } from "../../custom/processes";

/**
 * Interface - Command Line Manager
 */
export interface CmdLineManager
{
    validate(): commandLineArgs.CommandLineOptions;
} 

/**
 * Implementation - Command Line Manager
 */
@injectable()
export class CmdLineManagerImpl implements CmdLineManager
{
     private _appConfiguration: AppConfiguration;
     private _processConfiguration: ProcessConfiguration;

    // Default global parameters
    cmdLineOptionDefinitions: Array<CmdLineOptionDefinition>;

    constructor(@inject(TYPES.AppConfiguration) appConfiguration: AppConfiguration,
                @inject(TYPES.ProcessConfiguration) processConfiguration: ProcessConfiguration,
                @inject(TYPES.Processes) processes: Processes)
    {
        this._appConfiguration = appConfiguration;
        this._processConfiguration = processConfiguration;
        this.cmdLineOptionDefinitions = this._appConfiguration.getConfig().customCmdLineOptionDefinition;
    }
    

    validate(): commandLineArgs.CommandLineOptions
    {
        let optionDefinitions: commandLineArgs.OptionDefinition[] = this.getNoMandatoryFlagCmdLineOptionDefinitions();
        const options = commandLineArgs(optionDefinitions);
        this.validateMandatory(options);

        return options;
    }

    private getCmdLineOptionDefinitions():  Array<CmdLineOptionDefinition>
    {
        return this.cmdLineOptionDefinitions;
    }

    private getNoMandatoryFlagCmdLineOptionDefinitions(): Array<commandLineArgs.OptionDefinition>
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
    private validateMandatory(checkAgainst: commandLineArgs.CommandLineOptions): void
    {
        let clonedTempArray: Array<CmdLineOptionDefinition> = this.cmdLineOptionDefinitions;

        let processModelArray: Array<ProcessModel> = this._processConfiguration.getProcessList();

        let fnGetProcessModel = function(processModels: Array<ProcessModel>, processCode: string)
        {
            let f = function(e: ProcessModel)
            {
                return e.getProcessCode() === processCode;
            }
            return processModels.find(f);
        }
       
        let processModel = fnGetProcessModel(processModelArray, checkAgainst['process-code'])

        if(!processModel)
        {
            let pcStr = processModelArray.map(function(e){ return e.getProcessCode()}).join('\n');
            throw new Error('Unknown process: ' + checkAgainst['process-code'] 
                + '. Available process codes are:\n' 
                + pcStr);
        }

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
