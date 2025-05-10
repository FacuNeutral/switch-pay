import { Injectable, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';
import * as colors from 'colors';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const statusCodeColor = (status: number) => {
            if (status >= 200 && status < 300) return colors.green(status.toString());
            if (status >= 300 && status < 400) return colors.blue(status.toString());
            if (status >= 400 && status < 500) return colors.red(status.toString());
            if (status >= 500) return colors.yellow(status.toString());
            return status;
        };

        const methodColor = (method: string) => {
            switch (method) {
                case 'GET':
                    return colors.green(method);
                case 'POST':
                    return colors.yellow(method);
                case 'PUT':
                    return colors.blue(method);
                case 'PATCH':
                    return colors.magenta(method);
                case 'DELETE':
                    return colors.red(method);
                default:
                    return method;
            }
        };

        morgan(
            ':method :url :response-time[0] ms',
            {
            stream: {
                write: (message: string) => {
                //* Get the response status code
                const status = res.statusCode;
                //* Get the request method
                const method = req.method;

                //* Replace the method in the message with its colored version
                const coloredMessage = message.replace(
                    method,
                    methodColor(method)
                );

                //* Use the color function to apply color to the status code
                console.log(`${coloredMessage.trim()} [ ${statusCodeColor(status)} ]`);
                },
            },
            }
        )(req, res, next);
    }
}
