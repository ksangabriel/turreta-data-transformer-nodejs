import { FieldToLineSubstringModel } from "./field-to-line-substr.model";

/**
 * A class that holds the field-to-value extracted from a line of text and information 
 * about the field about its start-end indexes and name. 
 */
export class FieldToLineExtractedValue
{
    private fieldToLineModel: FieldToLineSubstringModel;
    private extractedValue: string;

    constructor(fieldToLineModel: FieldToLineSubstringModel, extractedValue: string)
    {
        this.fieldToLineModel = fieldToLineModel;
        this.extractedValue = extractedValue;
    }

    public getFieldToLineModel(): FieldToLineSubstringModel
    {
        return this.fieldToLineModel;
    }

    public getExtractedValue(): string {
        return this.extractedValue;
    }
}


