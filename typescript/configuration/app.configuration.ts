import { CmdLineOptionDefinition } from "../cmdline/cmdline.optiondefinition";
import { injectable, Container } from "inversify";

export interface AppConfiguration
{
    getConfig(): any;
}

@injectable()
export class AppConfigurationImpl implements AppConfiguration
{
    constructor()
    {
        console.log('AppConfigurationImpl:constructor()');
    }

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
