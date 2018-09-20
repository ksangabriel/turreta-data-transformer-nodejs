import { CommandLineOptions } from "command-line-args";

export interface Process
{
    getName(): string;

    execute(options: CommandLineOptions): void;
}