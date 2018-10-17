import { Container } from "inversify";
import TYPES from "./internal/configuration/types";
import { CmdLineManager } from "./internal/cmdline/cmdline.manager";
import { ProcessController } from "./internal/common/process/process.controller";
import { ContainerContainer } from "./internal/common/container/container-container";
import { LoggerService } from "./internal/common/services/logger.service";

class DataTransformer 
{
  public main(): number 
  {
    let container:Container = ContainerContainer.instance;
    let cmdLineManager: CmdLineManager = container.get<CmdLineManager>(TYPES.CmdLineManager);
    let processController: ProcessController = container.get<ProcessController>(TYPES.ProcessController);
    let loggerService: LoggerService = container.get<LoggerService>(TYPES.LoggerService);

    try 
    {
      let cmdOptions = cmdLineManager.validate();
      processController.delegate(cmdOptions)
    }
    catch(e)
    {
      loggerService.error(e.message);
    }

    return 0;
  }
}

let dataTransformer = new DataTransformer();

dataTransformer.main();
