import { LogDatePattern, LogMaxFiles } from "../interfaces/logger.interface";
import { createLogger, format, transports } from 'winston';

export const fileTransport = (filename: string, datePattern = LogDatePattern.DEFAULT, maxFiles = LogMaxFiles.DEFAULT) => {
    return new transports.DailyRotateFile({
        filename,
        datePattern,
        maxFiles,
    });
}
