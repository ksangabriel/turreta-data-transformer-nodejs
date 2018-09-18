/**
 * A class that holds the start-end indexes and name of a field in a line of text
 */
export class FieldToLineSubstringModel
{
    constructor(public fieldName: string, 
        public fieldStartLocAtIndex: number,
        public fieldEndLocAtIndex: number)
        {

        }
}