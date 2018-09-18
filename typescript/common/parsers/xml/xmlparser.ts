import * as xml2js from 'xml2js';

export class XmlParser
{
    public parseAsJSON(xmlDoc: string): JSON 
    {

        let result: JSON;
        xml2js.parseString(xmlDoc, function (err, fnResult) {
           result = fnResult;
        });
        return result;
    }
}