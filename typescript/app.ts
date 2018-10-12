import { Container } from "inversify";
import TYPES from "./configuration/types";
import { CmdLineManager } from "./cmdline/cmdline.manager";
import { ProcessController } from "./common/process/process.controller";
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
