import * as colors from 'colors';
import { firstUpperCase } from 'src/_common/utils/formats/format-string';
import { format } from 'winston';

import { formatProps } from '@config/loggers/format-props';

import { LogData } from '../interfaces/logger.interface';
import { NestContext } from '../interfaces/nest-context-interface';

export function formatLogForConsole(log: {
    timestamp: string;
    level: string;
    message: string;
    context?: string;
    metadata?: Record<string, any>;
    headers?: Record<string, any>;
}): string {
    // Convert ISO timestamp to "YYYY-MM-DD HH:mm:ss"
    const date = new Date(log.timestamp);
    const formattedTimestamp = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

    // Uppercase level
    const level = log.level.toUpperCase();
    const context = log.context || 'Nest';
    // Format metadata using your helper
    const metadataStr = formatProps(log.metadata, log.headers);
    // Combine everything
    const finalMessage = `${formattedTimestamp} - [${level}] [${context}] ${log.message} ${metadataStr}`;

    return finalMessage;
}


export function metadataFormat(metadata: Record<string, any> = {}): Record<string, any> {
    if (typeof metadata === 'string')
        return { metadata };
    return metadata;
}

export const colorizeByLevel = (level: string, message: string): string => {
    switch (level) {
        case 'INFO': return colors.green(message);
        case 'ERROR': return colors.red(message);
        case 'WARN': return colors.yellow(message);
        case 'DEBUG': return colors.cyan(message);
        case 'VERBOSE': return colors.magenta(message);
        default: return message;
    }
}

export const printFormattedLog = (log: LogData): void => {
    const date = new Date();
    const formattedTimestamp = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

    const level = (log.level as string).toUpperCase();
    const metadata = log.metadata
    const context = log.context || 'Nest';
    const contextMethod = log.metadata?.contextMethod;
    const message = log.message ? firstUpperCase(log.message) : 'No message';
    const combinedMetadata = formatProps(metadata, { userId: log.userId }, ['contextMethod']);

    const paintText = (message: string): string => {
        return colorizeByLevel(level, message);
    }

    // Combine everything
    const finalMessage =
        `${formattedTimestamp} - ${paintText(`[${level}]`)} ${colors.yellow(`[${context}]${contextMethod ? ` [${contextMethod}]` : ''}`)} ${paintText(message)} ${colors.gray(combinedMetadata)}`;

    console.log(finalMessage);
}
export const ignoreNestLogs = format((log: any) => {
    if (typeof log.metadata === 'string' && Object.values(NestContext).includes(log.metadata)) {
        printFormattedLog(log);
        return false;
    }

    return log;
});