import {Logger} from "ts-log-debug";
import { injectable } from "inversify";


/**
 * Interface - Application Config
 */
export interface LoggerService
{
    debug(msg: String): void;
    info(msg: String): void;
    trace(msg: String): void;
    error(msg: String): void;
    fatal(msg: String): void;
    warn(msg: String): void;
}

/**
 * Implementation - Application Config
 */
@injectable()
export class LoggerServiceImpl implements LoggerService
{
    private logger = new Logger("loggerName");

    constructor()
    {
        this.logger.appenders
            .set("std-log", 
                {
                    type: "stdout",
                    levels: ["debug", "info", "trace"]
                })
            .set("error-log", 
                {
                    type: "stderr",
                    levels: ["fatal", "error", "warn"],
                    layout: 
                    {
                        type: "pattern",
                        pattern: "%d %p %c %X{user} %m%n"
                    }
                })
                .set("all-log-file", {
                    type: "file",
                    filename: `${__dirname}/log/app.log`,
                    layout:
                    {
                        type: "json",
                        separator: ","
                    }
                });
    }

    debug(msg: String): void
    {
        this.logger.debug(msg);
    }
    
    info(msg: String): void
    {
        this.logger.info(msg);
    }
    
    trace(msg: String): void
    {
        this.logger.trace(msg);
    }
    
    error(msg: String): void
    {
        this.logger.error(msg);
    }

    fatal(msg: String): void
    {
        this.logger.fatal(msg);
    }
    
    warn(msg: String): void
    {
        this.logger.warn(msg);
    }
}
