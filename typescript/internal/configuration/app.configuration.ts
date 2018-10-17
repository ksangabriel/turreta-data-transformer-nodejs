import { CmdLineOptionDefinition } from "../cmdline/cmdline.optiondefinition";
import { injectable } from "inversify";

/**
 * Interface - Application Config
 */
export interface AppConfiguration
{
    getConfig(): any;
}

/**
 * Implementation - Application Config
 */
@injectable()
export class AppConfigurationImpl implements AppConfiguration
{

    /**
     * Global command-line parameters
     */
    private customCmdLineOptionDefinition: Array<CmdLineOptionDefinition> = [
        new CmdLineOptionDefinition({ name: 'process-code', type: String}, true),
        new CmdLineOptionDefinition({ name: 'output-dir', type: String}, false),
        new CmdLineOptionDefinition( { name: 'input-file', type: String}, true),
    ];

    public getConfig(): any
    {
        let config = {
            customCmdLineOptionDefinition: this.customCmdLineOptionDefinition
        };

        return config;
    }

   
}
