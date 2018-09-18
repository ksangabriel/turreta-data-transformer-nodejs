import { Process } from "../common/process/process.interface";

export class MyCustomProcess01 implements Process
{
    public getName()
    {
        return 'MyCustomProcess01';
    }
}

