import { MyCustomProcess01 } from "../custom/mycustom.process";
import { CmdLineOptionDefinition } from "../cmdline/cmdline.optiondefinition";
import { ProcessModel } from "../common/process/process.model";
import { injectable, Container } from "inversify";
import { Creator } from "../common/instance.loader";
import { Process } from "../common/process/process.interface";
import TYPES from "./types";

export interface AppConfiguration
{
    getConfig(): any;
}

@injectable()
export class AppConfigurationImpl implements AppConfiguration
{
    // new Creator(MyCustomProcess01).getNew()

    /**
     * Process Definitions
     */
    private processList: Array<ProcessModel> = [
        new ProcessModel('THIS_01', 
            () : Container => 
            {
                let container = new Container();
                container.bind<Process>(TYPES.Process).to(MyCustomProcess01);
                return container;
            }),
            
        new ProcessModel('THIS_02', 
            () : Container => 
            {
                let container = new Container();
                container.bind<Process>(TYPES.Process).to(MyCustomProcess01);
                return container;
            })
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
