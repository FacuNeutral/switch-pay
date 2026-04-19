import { Logger, LoggerService } from '@nestjs/common';
import * as colors from 'colors';

import { asyncLocalStorage } from '@middlewares/request-context.middleware';
import { formatProps } from './format-props';

 class CustomLogger extends Logger implements LoggerService {

  private colorizeLevel(level: string, message: string): string {
    switch (level) {
      case 'log': return colors.green(message);
      case 'error': return colors.red(message);
      case 'warn': return colors.yellow(message);
      case 'debug': return colors.cyan(message);
      case 'verbose': return colors.magenta(message);
      default: return message;
    }
  }

  private appendContext(message: string, nestContext: Record<string, any> = {}): string {
    const store = asyncLocalStorage.getStore();
    let prefix = '';

    if (store) {
      const method = store.get('method');
      const url = store.get('url');
      const ip = store.get('ip');
      const user = store.get('user');

      const userId = user?.id || user?.sub || null;
      prefix = `${colors.gray(formatProps({ userId, ...nestContext }))}`;
    }

    return `${colors.green(message)} ${prefix}`;
  }

  //@ts-ignore
  log(message: any, context?: Record<string, any>) {
    super.log(this.colorizeLevel('log', this.appendContext(message, context)));
  }

  //@ts-ignore
  error(message: string, trace?: string, context?: any) {
    super.error(this.colorizeLevel('error', this.appendContext(message, context)), trace);
  }

  warn(message: string, context?: any) {
    super.warn(this.colorizeLevel('warn', this.appendContext(message, context)));
  }

  debug(message: string, context?: any) {
    super.debug(this.colorizeLevel('debug', this.appendContext(message, context)));
  }

  verbose(message: string, context?: any) {
    super.log(this.colorizeLevel('verbose', this.appendContext(message, context)));
  }
}

export { CustomLogger as Logger };