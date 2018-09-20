import { Process } from "../../common/process/process.interface";
import { injectable, inject } from "inversify";
import { AppConfiguration } from "../../configuration/app.configuration";
import TYPES from "../../configuration/types";
import { CommandLineOptions } from "command-line-args";

import * as LineByLineReader  from "line-by-line";
import { FieldToLineSubstringModel } from "../../common/parsers/text/field-to-line-substr.model";
import { FieldToLineManager } from "../../common/parsers/text/field-to-line.manager";

@injectable()
export class MyCustomProcess01 implements Process
{
    private _appConfiguration: AppConfiguration;
    private fieldToLineSubstringModels: FieldToLineSubstringModel[] = [
        new FieldToLineSubstringModel("Field1", 0, 10),
        new FieldToLineSubstringModel("Field2", 10, 20)
    ];

    constructor(@inject(TYPES.AppConfiguration) appConfiguration: AppConfiguration)
    {
        this._appConfiguration = appConfiguration;
    }
    public getName()
    {
        console.log(this._appConfiguration.getConfig());
        return 'MyCustomProcess01';
    }

    public execute(options: CommandLineOptions): void
    {
        let lr = new LineByLineReader(options['input-file']);

        lr.on('error', function (err) {
            // 'err' contains error object
        });
        

        let fieldToLineManager: FieldToLineManager = new FieldToLineManager();

        let self = this;
        lr.on('line', function (line) 
        {
           let el = fieldToLineManager.extractFields(line, self.fieldToLineSubstringModels);
           console.log(el);
        });
        
        lr.on('end', function () {
        });
    }
}

