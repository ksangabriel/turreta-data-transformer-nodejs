import { Process } from "../../internal/common/process/process.interface";
import { injectable, inject } from "inversify";
import { AppConfiguration } from "../../internal/configuration/app.configuration";
import { CommandLineOptions } from "command-line-args";
import { FieldToLineSubstringModel } from "../../internal/common/parsers/text/field-to-line-substr.model";
import { FieldToLineManager } from "../../internal/common/parsers/text/field-to-line.manager";
import TYPES from "../../internal/configuration/types";
import * as LineByLineReader  from "line-by-line";

@injectable()
export class FieldMappedTextFileToCSVFileProcess implements Process
{
    private _appConfiguration: AppConfiguration;
    private fieldToLineSubstringModels: FieldToLineSubstringModel[] = [
        new FieldToLineSubstringModel("Field1", 0, 10),
        new FieldToLineSubstringModel("Field2", 10, 20),
        new FieldToLineSubstringModel("Field3", 20, 30),
        new FieldToLineSubstringModel("Field4", 30, 40),
        new FieldToLineSubstringModel("Field5", 40, 50)
    ];

    constructor(@inject(TYPES.AppConfiguration) appConfiguration: AppConfiguration)
    {
        this._appConfiguration = appConfiguration;
    }
    public getName()
    {
        console.log(this._appConfiguration.getConfig());
        return 'This converts a field-mapped text file to a csv file';
    }

    public execute(options: CommandLineOptions): void
    {
        let lr = new LineByLineReader(options['input-file']);

        lr.on('error', function (err) {
            // 'err' contains error object
        });
        

        let fieldToLineManager: FieldToLineManager = new FieldToLineManager();

        let headers = this.fieldToLineSubstringModels.map(model => model.fieldName);
        let csvWriter = require('csv-write-stream')
        let writer = csvWriter({ headers: headers});

        let fs = require("fs");
        let uuidv1 = require("uuid/v1");

        let self = this;
        // writer.pipe(fs.createWriteStream(options['output-dir'] + '/' + uuidv1() + 'out.csv'))
        writer.pipe(fs.createWriteStream(uuidv1() + 'out.csv'))

        lr.on('line', function (line) 
        {
           let el = fieldToLineManager.extractFields(line, self.fieldToLineSubstringModels);
           //console.log(el[0].getExtractedValue());
           writer.write(el.map(model => model.getExtractedValue()));
        });
        

        lr.on('end', function () {
            writer.end();
        });
    }
}

