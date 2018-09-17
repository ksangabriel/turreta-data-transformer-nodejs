import { MyCustomProcess01 } from "../custom/mycustom.process";
import { CmdLineOptionDefinition } from "../cmdline/cmdline.optiondefinition";
import { ProcessModel } from "../common/process/process.model";

export class AppConfiguration
{

    private processList: Array<ProcessModel> = [
        new ProcessModel('THIS_01', MyCustomProcess01)
    ];

    private customCmdLineOptionDefinition: Array<CmdLineOptionDefinition> = [
        new CmdLineOptionDefinition({ name: 'process-code1', type: String}, true),
        new CmdLineOptionDefinition({ name: 'output-dir1', type: String}, true),
        new CmdLineOptionDefinition( { name: 'input-file1', type: String}, true),
    ];

    private getConfig(): any
    {
        let config = {
            processList: this.processList,
            customCmdLineOptionDefinition: this.customCmdLineOptionDefinition
        };

        return config;
    }

   
}
