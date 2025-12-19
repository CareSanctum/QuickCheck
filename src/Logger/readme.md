# Logger

## Usage
```typescript
import {logger, Logger} from '/Logger'

//import logger or create an instance with a custom context
//const logger = Logger.create(LogContext.Notifications)

//Methods
logger.debug(message, metadata)

logger.info(message, metadata)

logger.log(message, metadata)

logger.warn(message, metadata)

//for known errors without exception use a string, else use an Error Object
logger.error(message, metadata)
```

### Log Levels

Log Levels defaults to `info`. This can be changed via `EXPO_PUBLIC_LOG_LEVEL` env var. All logs less severe than the level are filtered out by default. In production change this value to send only required Logs.

#### TODO
- [] Since Debug Logs can get noisy and not enabled by default. We need to add another env var to help enable Debug logs based on Context
- [] Add custom transports for analytics and crashlytics platform