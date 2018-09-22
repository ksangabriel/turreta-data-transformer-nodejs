import { XmlParser } from "./common/parsers/xml/xmlparser";
import commandLineArgs = require('command-line-args');
import { AppConfiguration } from "./configuration/app.configuration";

//import container from "./configuration/inversify.config";
import TYPES from "./configuration/types";
import { CmdLineManager } from "./cmdline/cmdline.manager";
import { Process } from "./common/process/process.interface";
import { Container, interfaces } from "inversify";
import { ProcessModel } from "./common/process/process.model";
import { ProcessController } from "./common/process/process.controller";
import { ProcessConfiguration } from "./configuration/process.configuration";
import { ContainerContainer } from "./common/container/container-container";


class MainClass 
{
  private containerContainer: ContainerContainer = new ContainerContainer();

  public main(): number 
  {

    let container:Container = this.containerContainer.getContainer();

    console.log('container:' + container);

    /* Start - retrieve objects from container that are needed in this method */
    let cmdLineManager: CmdLineManager = container.get<CmdLineManager>(TYPES.CmdLineManager);
    let processConfiguration: ProcessConfiguration = container.get<ProcessConfiguration>(TYPES.ProcessConfiguration);
    let appConfiguration = container.get<AppConfiguration>(TYPES.AppConfiguration);
    let processController = container.get<ProcessController>(TYPES.ProcessController);
    /* End - retrieve objects from container that are needed in this method */

    /* Start - process CLI parameters */
    let optionDefinitions: commandLineArgs.OptionDefinition[] = cmdLineManager.getNoMandatoryFlagCmdLineOptionDefinitions();
    const options = commandLineArgs(optionDefinitions);
    cmdLineManager.validateMandatory(options);
    /* End - process CLI parameters */

    let processCode = options['process-code'];


    console.log(options);

    //processController.delegate()


    let mainContainer: interfaces.Container;

    let processModelList: Array<ProcessModel> = processConfiguration.getConfig().processList;

    for (let processModel of processModelList) {
      if (processModel.getProcessCode() === processCode) {
        console.log("Found!");

        mainContainer = Container.merge(container, processModel.getContainer());
      }
    }

    let process: Process = mainContainer.get<Process>(TYPES.Process);

    processController.delegate(options, process)

    console.log('Process:' + process.getName());


    let appConfig: AppConfiguration = appConfiguration;

    let checkProcessCode = processCodeParam => appConfig.getConfig().processList.some(({ process_code }) => process_code === processCodeParam)

    // if(!checkProcessCode(processCode))
    // {
    //   throw new Error('process code not found!');
    // }


    let xml = '<?xml version="1.0" encoding="UTF-8" ?><business xmlns:h="http://www.w3.org/TR/html4/"><company>Code Blog</company><owner>Nic Raboy</owner><employee id="1"><firstname>Nic</firstname><lastname>Raboy</lastname></employee><employee id="2"><firstname>Maria</firstname><lastname>Campos</lastname></employee></business>';

    let parser = new XmlParser();
    let str = JSON.stringify(parser.parseAsJSON(xml));

    //console.log(str);





    ///

    return 0;
  }

  static o()
  {
    console.log('ddd');
  }
}

let mainClass = new MainClass();

MainClass.o();
mainClass.main();



