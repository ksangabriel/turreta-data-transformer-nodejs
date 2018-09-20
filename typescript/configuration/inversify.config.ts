import { Container } from "inversify";
import TYPES from "./types";
import "reflect-metadata";
import { CmdLineManager, CmdLineManagerImpl } from "../cmdline/cmdline.manager";
import { AppConfigurationImpl, AppConfiguration } from "./app.configuration";
import { ProcessController, ProcessControllerImpl } from "../common/process/process.controller";

/**
 * The main Container object for the whole application. Other Container objects are 
 * temporary.
 *
 * Does the container re-autowire when a new bean is bound?
 */
let container = new Container({ defaultScope: "Singleton" });

container.bind<AppConfiguration>(TYPES.AppConfiguration).to(AppConfigurationImpl);
container.bind<CmdLineManager>(TYPES.CmdLineManager).to(CmdLineManagerImpl);
container.bind<ProcessController>(TYPES.ProcessController).to(ProcessControllerImpl);




export default container;