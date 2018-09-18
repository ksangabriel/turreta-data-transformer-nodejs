import { ExportMe } from "./common/test";
import { XmlParser } from "./common/parsers/xml/xmlparser";
import { Parser } from "xml2js";
import commandLineArgs = require('command-line-args');
import { OptionDefinition, CommandLineOptions, ParseOptions } from "command-line-args";
import { AppConfiguration } from "./configuration/app.configuration";

/**
 * TODOS:
 * 
 * 1. Need an IOC/DI container - DONE
 * 2. For a particular process code, check default global, custom global, and process-specific command-line parameters
 * 3. Use environment variables?
 */


import container from "./configuration/inversify.config";
import TYPES from "./configuration/types";
import { CmdLineManager } from "./cmdline/cmdline.manager";
import { Process } from "./common/process/process.interface";

let cmdLineManager: CmdLineManager = container.get<CmdLineManager>(TYPES.CmdLineManager);

let optionDefinitions :  commandLineArgs.OptionDefinition[] = [];

for(let option of cmdLineManager.getCmdLineOptionDefinitions())
{
  optionDefinitions.push(option.getOptionDefinition());
}

const options = commandLineArgs(optionDefinitions);
cmdLineManager.validateMandatory(null, options);

let appConfiguration = container.get<AppConfiguration>(TYPES.AppConfiguration);

let processCode = options['process-code'];

for(let process of appConfiguration.getConfig().processList)
{
    if(process.getProcessCode() === processCode)
    {
      console.log("Found!");
      let oo = new process.getProcessClassType();
      console.log('oo:' + JSON.stringify(oo));
    }
}

console.log(options);


let appConfig: AppConfiguration = appConfiguration;

let checkProcessCode = processCodeParam => appConfig.getConfig().processList.some( ({process_code}) => process_code === processCodeParam)

// if(!checkProcessCode(processCode))
// {
//   throw new Error('process code not found!');
// }


let xml = '<?xml version="1.0" encoding="UTF-8" ?><business xmlns:h="http://www.w3.org/TR/html4/"><company>Code Blog</company><owner>Nic Raboy</owner><employee id="1"><firstname>Nic</firstname><lastname>Raboy</lastname></employee><employee id="2"><firstname>Maria</firstname><lastname>Campos</lastname></employee></business>';

let parser = new XmlParser();
let str = JSON.stringify(parser.parseAsJSON(xml));

//console.log(str);

export class Te
{
    
}


