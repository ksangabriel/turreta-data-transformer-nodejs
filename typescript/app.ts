import { ExportMe } from "./common/test";
import { XmlParser } from "./common/parsers/xml/xmlparser";
import { Parser } from "xml2js";
import commandLineArgs = require('command-line-args');
import { OptionDefinition, CommandLineOptions, ParseOptions } from "command-line-args";
import { AppConfiguration } from "./configuration/app.configuration";

/**
 * TODOS:
 * 
 * 1. Need an IOC/DI container
 * 2. For a particular process code, check default global, custom global, and process-specific command-line parameters
 * 3. Use environment variables?
 */


let t : OptionDefinition;

const optionDefinitions : commandLineArgs.OptionDefinition[] = [
    { name: 'process-code', type: String},
    { name: 'output-dir', type: String},
    { name: 'input-file', type: String},
    { name: 'verbose', alias: 'v', type: Boolean },
    { name: 'src', type: String, multiple: true, defaultOption: true },
    { name: 'timeout', alias: 't', type: Number }
  ]

const options = commandLineArgs(optionDefinitions);



console.log(options);

let processCode = options['process-code'];
let appConfig: AppConfiguration = new AppConfiguration();

let checkProcessCode = processCodeParam => appConfig.getConfig().processList.some( ({process_code}) => process_code === processCodeParam)

if(!checkProcessCode(processCode))
{
  throw new Error('process code not found!');
}


let xml = '<?xml version="1.0" encoding="UTF-8" ?><business xmlns:h="http://www.w3.org/TR/html4/"><company>Code Blog</company><owner>Nic Raboy</owner><employee id="1"><firstname>Nic</firstname><lastname>Raboy</lastname></employee><employee id="2"><firstname>Maria</firstname><lastname>Campos</lastname></employee></business>';

let parser = new XmlParser();
let str = JSON.stringify(parser.parseAsJSON(xml));

//console.log(str);

export class Te
{
    
}


