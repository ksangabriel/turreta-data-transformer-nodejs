import { Container } from "inversify";
import TYPES from "./types";
import "reflect-metadata";
import { CmdLineManager, CmdLineManagerImpl } from "../cmdline/cmdline.manager";
import { AppConfigurationImpl, AppConfiguration } from "./app.configuration";

/**
 * The main Container object for the whole application. Other Container objects are 
 * temporary.
 */
let container = new Container({ defaultScope: "Singleton" });

container.bind<CmdLineManager>(TYPES.CmdLineManager).to(CmdLineManagerImpl);
container.bind<AppConfiguration>(TYPES.AppConfiguration).to(AppConfigurationImpl);


export default container;