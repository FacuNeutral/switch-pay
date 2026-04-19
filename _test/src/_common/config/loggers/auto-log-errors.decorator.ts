import { Logger } from '@nestjs/common';
import { yellow, red } from 'colorette';
import 'reflect-metadata';

/**
 * English: The `SkipAutoLog` decorator is a method decorator that marks a method to skip automatic error logging.
 * 
 * Español: El decorador `SkipAutoLog` es un decorador de método que marca un método para omitir el registro automático de errores.
 * 
 * @returns {MethodDecorator} A method decorator function.
 * @author Facundo Alvarez | GitHub - FacuNeutral
 */
export function SkipAutoLog(): MethodDecorator {
  return function (target, propertyKey) {
    Reflect.defineMetadata('skipAutoLog', true, target, propertyKey);
  };
}


/**
 * English: The `AutoLogErrors` decorator is a class decorator that automatically wraps all methods of a class
 * (except the constructor and methods marked with `SkipAutoLog`) with error logging functionality. If an error
 * occurs during the execution of a method, it logs the error message using the NestJS Logger.
 * 
 * Español: El decorador `AutoLogErrors` es un decorador de clase que envuelve automáticamente todos los métodos
 * de una clase (excepto el constructor y los métodos marcados con `SkipAutoLog`) con funcionalidad de registro de errores.
 * Si ocurre un error durante la ejecución de un método, registra el mensaje de error utilizando el Logger de NestJS.
 * 
 * @returns {ClassDecorator} A class decorator function.
 * @author Facundo Alvarez | GitHub - FacuNeutral
 */
export function AutoLogErrors(): ClassDecorator {
  return function (target: any) {
    const logger = new Logger(target.name);
    const methodNames = Object.getOwnPropertyNames(target.prototype);

    methodNames.forEach((methodName) => {
      const originalMethod = target.prototype[methodName];

      if (typeof originalMethod !== 'function' || methodName === 'constructor') return;

      // Verifica si el método tiene la metadata para omitir el log
      const shouldSkip = Reflect.getMetadata('skipAutoLog', target.prototype, methodName);
      if (shouldSkip) return;

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
