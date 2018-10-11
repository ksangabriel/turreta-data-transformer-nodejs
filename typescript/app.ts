import { XmlParser } from "./common/parsers/xml/xmlparser";
import commandLineArgs = require('command-line-args');
import { AppConfiguration } from "./configuration/app.configuration";
import TYPES from "./configuration/types";
import { CmdLineManager } from "./cmdline/cmdline.manager";
import { Process } from "./common/process/process.interface";
import { Container, interfaces } from "inversify";
import { ProcessModel } from "./common/process/process.model";
import { ProcessController } from "./common/process/process.controller";
import { ProcessConfiguration } from "./configuration/process.configuration";
import { ContainerContainer } from "./common/container/container-container";


class DataTransformer 
{
  public main(): number 
  {
    let container:Container = ContainerContainer.instance;
    let cmdLineManager: CmdLineManager = container.get<CmdLineManager>(TYPES.CmdLineManager);
    let processController: ProcessController = container.get<ProcessController>(TYPES.ProcessController);

    let cmdOptions = cmdLineManager.validate();
    processController.delegate(cmdOptions)

    return 0;
  }
}

let dataTransformer = new DataTransformer();

dataTransformer.main();
