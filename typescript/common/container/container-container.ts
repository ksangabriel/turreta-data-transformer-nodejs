import { Container } from "inversify";
import "reflect-metadata";
import { CmdLineManager, CmdLineManagerImpl } from "../../cmdline/cmdline.manager";
import { AppConfigurationImpl, AppConfiguration } from "../../configuration/app.configuration";
import { ProcessController, ProcessControllerImpl } from "../process/process.controller";
import { ProcessConfiguration, ProcessConfigurationImpl } from "../../configuration/process.configuration";
import TYPES from "../../configuration/types";
import { Processes, ProcessesImpl } from "../../custom/processes";

/**
 * This encapsulates the inversify Container
 */
export class ContainerContainer
{
    private static container: Container;


    static get instance(): Container
    {
        if(!ContainerContainer.container)
        {
            ContainerContainer.createAndConfigure();
        }

        return ContainerContainer.container;
    }
    /**
     * Create and configure Inversify container
     */
    private static createAndConfigure()
    {
        ContainerContainer.container = new Container({defaultScope: "Singleton"});
        ContainerContainer.container.bind<ProcessConfiguration>(TYPES.ProcessConfiguration).to(ProcessConfigurationImpl);
        ContainerContainer.container.bind<AppConfiguration>(TYPES.AppConfiguration).to(AppConfigurationImpl);
        ContainerContainer.container.bind<CmdLineManager>(TYPES.CmdLineManager).to(CmdLineManagerImpl);
        ContainerContainer.container.bind<ProcessController>(TYPES.ProcessController).to(ProcessControllerImpl);
        ContainerContainer.container.bind<Processes>(TYPES.Processes).to(ProcessesImpl);
    }
}


