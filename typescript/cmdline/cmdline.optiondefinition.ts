import commandLineArgs = require('command-line-args');

/**
 * A class that abstracts commandLineArgs.OptionDefinition to use a mandatory field to
 * indicate whether or not a command-line argument is mandatory or not.
 */
export class CmdLineOptionDefinition
{
    private optionDefinition: commandLineArgs.OptionDefinition;

    /**
     * Is this mandatory? If not, then it is optional.
     */
    private mandatory: boolean = false;

    constructor(optionDefinition: commandLineArgs.OptionDefinition, mandatory: boolean)
    {
        this.optionDefinition = optionDefinition;
        this.mandatory = mandatory;
    }
    
}