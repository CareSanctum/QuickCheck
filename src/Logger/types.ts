export enum LogLevel {
    Debug = 'debug',
    Info = 'info',
    Log = 'log',
    Warn = 'warn',
    Error = 'error',
}



export type Transport = (
    level: LogLevel,
    context: LogContext | undefined,
    message: string | Error,
    metadata: Metadata,
    timestamp: number,
  ) => void

export enum LogContext {
    Default = 'default',
}

export type Metadata = {
    type?:
    | 'default'
    | 'debug'
    | 'error'
    | 'navigation'
    | 'http'
    | 'info'
    | 'query'
    | 'transaction'
    | 'ui'
    | 'user'

    [key: string]: Serializable | Error | unknown
}

export type Serializable = string | number | boolean | null | undefined | Serializable[] | { [key: string]: Serializable }