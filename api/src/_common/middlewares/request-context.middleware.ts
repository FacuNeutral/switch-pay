import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const store = new Map<string, any>();
        const request = {
            id: uuidv4(),
            method: req.method,
            path: req.originalUrl,
            ip: req.ip || undefined,
            // ip: "10.0.0.0",
        }
        const device = {
            userAgent: req.headers['user-agent'],
            platform: req.headers['sec-ch-ua-platform'] as string | undefined
        }

        store.set('request', request);
        store.set('device', device);

        asyncLocalStorage.run(store, () => next());
    }
}
