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

        morgan(
            ':method :url :response-time[0] ms - :res[content-length]',
            {
                stream: {
                    write: (message: string) => {
                        // Obtenemos el código de estado de la respuesta
                        const status = res.statusCode;
                        // Usamos la función de color para aplicar el color al código de estado
                        console.log(`${message.trim()} [ ${statusCodeColor(status)} ]`);
                    },
                },
            }
        )(req, res, next);
    }
}
