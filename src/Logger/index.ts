// import {logger, mapConsoleTransport} from 'react-native-logs';
import { LogLevel, LogContext, Metadata, Transport } from './types';
import { enabledLogLevels } from './utils';
import { consoleTransport } from './transports/console';

const TRANSPORTS: Transport[] = [consoleTransport];

export class Logger {
    static Level = LogLevel;
    static Context = LogContext;

    Level: LogLevel
    context: LogContext | undefined = undefined 

    protected transports: Transport[] = [];

    static create(context: LogContext) {
        const logger = new Logger({
            context,
            level: process.env.EXPO_PUBLIC_LOG_LEVEL as LogLevel
        });

        for (const transport of TRANSPORTS) {
            logger.addTransport(transport);
        }

        return logger;
    }
    
    constructor({level, context}: {level: LogLevel, context: LogContext}) {
        this.context = context;
        this.Level = level || LogLevel.Info;
    }

    addTransport(transport: Transport) {
        this.transports.push(transport);
    }

    protected transport({level, message, metadata = {}}: { level: LogLevel, message: string | Error, metadata: Metadata }) {
        const timestamp = Date.now();
        if (!enabledLogLevels[this.Level].includes(level)) return;
        
        for (const transport of this.transports) {
            transport(level, this.context, message, metadata, timestamp);
        }
    }

    debug(message: string, metadata: Metadata = {   }) {
        this.transport({level: LogLevel.Debug, message, metadata});
    }

    info(message: string, metadata: Metadata = {   }) {
        this.transport({level: LogLevel.Info, message, metadata});
    }

    log(message: string, metadata: Metadata = {   }) {
        this.transport({level: LogLevel.Log, message, metadata});
    }

    warn(message: string, metadata: Metadata = {   }) {
        this.transport({level: LogLevel.Warn, message, metadata});
    }

    error(message: string | Error, metadata: Metadata = {   }) {
        this.transport({level: LogLevel.Error, message, metadata});
    }

}

export const logger = Logger.create(LogContext.Default);