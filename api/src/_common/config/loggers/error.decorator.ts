import { Logger } from '@nestjs/common';
import { yellow, red } from 'colorette';

export function AutoLogErrors(): ClassDecorator {
  return function (target: any) {
    const logger = new Logger(target.name);

    const methodNames = Object.getOwnPropertyNames(target.prototype);

    methodNames.forEach((methodName) => {
      const originalMethod = target.prototype[methodName];

      if (typeof originalMethod !== 'function' || methodName === 'constructor') return;

      target.prototype[methodName] = async function (...args: any[]) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          logger.error(`${yellow(`[${methodName}]`)} ${red(error.message)}`);
          throw error;
        }
      };
    });
  };
}
