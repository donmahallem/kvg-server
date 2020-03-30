/*!
 * Source https://github.com/donmahallem/kvg-server
 */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
export const serverErrorHandler: ErrorRequestHandler =
    (err: any, req: Request, res: Response, next: NextFunction): void => {
        // tslint:disable-next-line:no-console
        if (err.statusCode) {
            res.status(err.statusCode)
                .json({
                    error: true,
                    message: err.message,
                    statusCode: err.statusCode,
                });
            return;
        }
        console.error(err);
        res.status(500).json({ error: true, statusCode: 500 });
    };
