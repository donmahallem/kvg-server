/*!
 * Source https://github.com/donmahallem/kvg-server
 */

import { createApiProxyRouter } from '@manniwatch/api-proxy-router';
import * as express from 'express';
import * as helmet from 'helmet';
import { Server } from 'http';
import { notFoundHandler } from './not-found-handler';
import { serverErrorHandler } from './server-error-handler';

export class KvgServer {
    private app: express.Application;
    private server: Server;
    constructor(public readonly endpoint: string,
        public readonly port: number) {
        this.app = express();
        this.app.use(helmet.contentSecurityPolicy({
            directives: {
                connectSrc: ['\'self\'',
                    'https://c.tile.openstreetmap.org',
                    'https://b.tile.openstreetmap.org',
                    'https://a.tile.openstreetmap.org'],
                defaultSrc: ['\'self\''],
                imgSrc: ['\'self\'',
                    'https://c.tile.openstreetmap.org',
                    'https://b.tile.openstreetmap.org',
                    'https://a.tile.openstreetmap.org',
                    'data:'],
                scriptSrc: ['\'self\'', '\'unsafe-inline\''],
                styleSrc: ['\'self\'', '\'unsafe-inline\''],
            },
        }));
        this.app.use('/api', createApiProxyRouter(endpoint));
        this.app.use(notFoundHandler);
        this.app.use(serverErrorHandler);
    }

    public start(): void {
        this.server = this.app.listen(this.port);
    }

    public stop(): void {
        this.server.close((err: any): void => {
            // tslint:disable-next-line:no-console
            console.log('Server closed', err);
        });
    }
}
