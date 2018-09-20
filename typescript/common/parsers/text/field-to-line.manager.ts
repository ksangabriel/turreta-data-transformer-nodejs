import { FieldToLineExtractedValue } from "./field-to-line-substr-extracted-val.model";
import { FieldToLineSubstringModel } from "./field-to-line-substr.model";

export class FieldToLineManager
{

    extractFields(line: string, fieldToLineSubstringModels: FieldToLineSubstringModel[]): FieldToLineExtractedValue[]
    {
        let extractedFields : FieldToLineExtractedValue[] = [];

        console.log('dddd' + fieldToLineSubstringModels);
        for(let model of fieldToLineSubstringModels)
        {
            let substrFromLine: string = line.substring(model.fieldStartLocAtIndex, model.fieldEndLocAtIndex);
            let extractField = new FieldToLineExtractedValue(model, substrFromLine);
            extractedFields.push(extractField);
        }
        return extractedFields;
    }
}