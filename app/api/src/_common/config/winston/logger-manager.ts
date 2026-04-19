import { winstonConfig } from './logger.config';
import { LogData } from './interfaces/logger.interface';

class LoggerManager {

    info(data: LogData) {
        winstonConfig.loggerInfo.info(data);
    }
    verbose(data: LogData) {
        winstonConfig.loggerInfo.verbose(data);
    }
    debug(data: LogData) {
        winstonConfig.loggerInfo.debug(data);
    }
    error(data: LogData) {
        winstonConfig.loggerError.error(data);
    }
    warn(data: LogData) {
        winstonConfig.loggerWarn.warn(data);
    }

}

export default LoggerManager;