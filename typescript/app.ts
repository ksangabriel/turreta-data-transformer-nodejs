import { ExportMe } from "./common/test";
import { XmlParser } from "./common/parsers/xmlparser";
import { Parser } from "xml2js";


let xml = '<?xml version="1.0" encoding="UTF-8" ?><business xmlns:h="http://www.w3.org/TR/html4/"><company>Code Blog</company><owner>Nic Raboy</owner><employee id="1"><firstname>Nic</firstname><lastname>Raboy</lastname></employee><employee id="2"><firstname>Maria</firstname><lastname>Campos</lastname></employee></business>';

let parser = new XmlParser();
let str = JSON.stringify(parser.parseAsJSON(xml));

console.log(str);

export class Te
{
    
}

console.log("Hello!");

let o = new ExportMe();
console.log(o.name);

