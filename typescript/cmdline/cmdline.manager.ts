import { CmdLineOptionDefinition } from "./cmdline.optiondefinition";
import commandLineArgs = require('command-line-args');
import { injectable } from "inversify";

export interface CmdLineManager
{
    validateMandatory(otherCmdLineOptionDefinitions: Array<CmdLineOptionDefinition>, 
        checkAgainst: commandLineArgs.CommandLineOptions);

    getCmdLineOptionDefinitions():  Array<CmdLineOptionDefinition>;
} 

@injectable()
export class CmdLineManagerImpl implements CmdLineManager
{
    // Default global parameters
    readonly cmdLineOptionDefinitions: Array<CmdLineOptionDefinition> = [
        new CmdLineOptionDefinition({ name: 'process-code', type: String}, true),
        new CmdLineOptionDefinition({ name: 'output-dir', type: String}, true),
        new CmdLineOptionDefinition( { name: 'input-file', type: String}, true),
    ];

    getCmdLineOptionDefinitions():  Array<CmdLineOptionDefinition>
    {
        return this.cmdLineOptionDefinitions;
    }

    /**
     * Validate provided CLI parameters in checkAgainst against cmdLineOptionDefinitions and otherCmdLineOptionDefinitions (if available)
     * 
     * @param otherCmdLineOptionDefinitions 
     * @param checkAgainst 
     */
    validateMandatory(otherCmdLineOptionDefinitions: Array<CmdLineOptionDefinition>, checkAgainst: commandLineArgs.CommandLineOptions): void
    {
        let clonedTempArray: Array<CmdLineOptionDefinition> = this.cmdLineOptionDefinitions;

        if(otherCmdLineOptionDefinitions != null)
        {
            clonedTempArray = clonedTempArray.concat(otherCmdLineOptionDefinitions);
        }

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
