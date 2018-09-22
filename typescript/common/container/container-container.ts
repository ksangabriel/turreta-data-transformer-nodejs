import { Container } from "inversify";
import TYPES from "../../configuration/types";
import "reflect-metadata";
import { CmdLineManager, CmdLineManagerImpl } from "../../cmdline/cmdline.manager";
import { AppConfigurationImpl, AppConfiguration } from "../../configuration/app.configuration";
import { ProcessController, ProcessControllerImpl } from "../process/process.controller";
import { ProcessConfiguration, ProcessConfigurationImpl } from "../../configuration/process.configuration";

/**
 * This encapsulates the inversify Container
 */
export class ContainerContainer
{
    private container: Container;

    constructor()
    {
        /**
         * The main Container object for the whole application. Other Container objects are 
         * temporary.
         *
         * Does the container re-autowire when a new bean is bound?
         */
        let container = new Container();

        container.bind<ProcessConfiguration>(TYPES.ProcessConfiguration).to(ProcessConfigurationImpl);
        container.bind<AppConfiguration>(TYPES.AppConfiguration).to(AppConfigurationImpl);
        container.bind<CmdLineManager>(TYPES.CmdLineManager).to(CmdLineManagerImpl);
        container.bind<ProcessController>(TYPES.ProcessController).to(ProcessControllerImpl);

    }

    public getContainer() : Container
    {
        return this.container;
    }
}