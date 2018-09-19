import { CmdLineOptionDefinition } from "./cmdline.optiondefinition";
import commandLineArgs = require('command-line-args');
import { injectable, inject } from "inversify";
import TYPES from "../configuration/types";
import { AppConfiguration } from "../configuration/app.configuration";

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


    // Default global parameters
    cmdLineOptionDefinitions: Array<CmdLineOptionDefinition>;

    constructor(@inject(TYPES.AppConfiguration) appConfiguration: AppConfiguration)
    {
        this._appConfiguration = appConfiguration;
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

        for(let option of clonedTempArray)
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
