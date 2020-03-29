/*!
 * Source https://github.com/donmahallem/kvg-server
 */

import { NextFunction, Request, RequestHandler, Response } from 'express';

export const notFoundHandler: RequestHandler =
    (req: Request, res: Response, next: NextFunction): void => {
        res.status(404).json({
            statusCode: 404,
        });
    };
