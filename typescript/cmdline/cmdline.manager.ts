import { CmdLineOptionDefinition } from "./cmdline.optiondefinition";

export class CmdLineManager
{
    readonly cmdLineOptionDefinition: Array<CmdLineOptionDefinition> = [
        new CmdLineOptionDefinition({ name: 'process-code', type: String}, true),
        new CmdLineOptionDefinition({ name: 'output-dir', type: String}, true),
        new CmdLineOptionDefinition( { name: 'input-file', type: String}, true),
    ];

}
