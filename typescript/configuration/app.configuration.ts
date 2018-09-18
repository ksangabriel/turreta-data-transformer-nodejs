import { MyCustomProcess01 } from "../custom/mycustom.process";
import { CmdLineOptionDefinition } from "../cmdline/cmdline.optiondefinition";
import { ProcessModel } from "../common/process/process.model";
import { injectable } from "inversify";
import { Creator } from "../common/instance.loader";

export interface AppConfiguration
{
    getConfig(): any;
}

@injectable()
export class AppConfigurationImpl implements AppConfiguration
{

    /**
     * Process Definitions
     */
    private processList: Array<ProcessModel> = [
        new ProcessModel('THIS_01', new Creator(MyCustomProcess01).getNew())
    ];


    /**
     * Global custom command-line parameters
     */
    private customCmdLineOptionDefinition: Array<CmdLineOptionDefinition> = [
        new CmdLineOptionDefinition({ name: 'custom-global-param-01', type: String}, true),
        new CmdLineOptionDefinition({ name: 'custom-global-param-02', type: String}, true),
        new CmdLineOptionDefinition( { name: 'custom-global-param-03', type: String}, true),
    ];

    public getConfig(): any
    {
        let config = {
            processList: this.processList,
            customCmdLineOptionDefinition: this.customCmdLineOptionDefinition
        };

        return config;
    }

   
}
