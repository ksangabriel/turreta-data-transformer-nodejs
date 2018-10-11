import { expect } from 'chai';
import 'mocha';

import { Container } from 'inversify';
import { ContainerContainer } from '../../../typescript/common/container/container-container';
import { AppConfiguration, AppConfigurationImpl } from '../../../typescript/configuration/app.configuration';
import TYPES from '../../../typescript/configuration/types';

export class ContainerContainerTest {


    public static allTests() {

        // let containerContainer: ContainerContainer = new ContainerContainer();
        // let container: Container = containerContainer.getContainer();

        // describe('ContainerContainerTest', () => {

        //     it('should return instance of AppConfigurationImpl', () => {

        //         console.log(container);
        //         let config: AppConfiguration = container.get<AppConfiguration>(TYPES.AppConfiguration);
        //         expect(config).to.be.instanceOf(AppConfigurationImpl);
        //     });
        // });

        // describe('ContainerContainerTest', () => {

        //     it('should return instance of AppConfigurationImpl', () => {

        //         console.log(container);
        //         let config: AppConfiguration = container.get<AppConfiguration>(TYPES.AppConfiguration);
        //         expect(config).to.be.instanceOf(AppConfigurationImpl);
        //     });
        // });
    }

}

ContainerContainerTest.allTests();