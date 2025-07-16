import { Logger, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export class FileLogger implements LoggerService {
  private readonly logFilePath = path.join(__dirname, 'logs', 'app.log');

  log(message: string) {
    this.writeLog('log', message);
  }

  error(message: string, trace: string) {
    this.writeLog('error', message, trace);
  }

  warn(message: string) {
    this.writeLog('warn', message);
  }

  debug(message: string) {
    this.writeLog('debug', message);
  }

  verbose(message: string) {
    this.writeLog('verbose', message);
  }

  private writeLog(level: string, message: string, trace?: string) {
    const logMessage = {
      timestamp: new Date().toISOString(),
      level,
      message,
      trace,
    };
    const logString = JSON.stringify(logMessage) + '\n';

    // Asegurarse de que el directorio de logs exista
    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Escribir el log en el archivo
    fs.appendFileSync(this.logFilePath, logString);
  }
}
