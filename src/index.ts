/*!
 * Source https://github.com/donmahallem/kvg-server
 */

import { KvgServer } from './kvg-server';

const apiEndpoint: string | undefined = process.env.KVG_API_ENDPOINT || undefined;

// tslint:disable-next-line:triple-equals
if (apiEndpoint == undefined) {
    throw new Error('Env variable \'KVG_API_ENDPOINT\' must be set');
}
const apiPort: number = parseInt(process.env.KVG_API_PORT || '4200', 10);
const apiServer: KvgServer = new KvgServer(apiEndpoint, apiPort);
apiServer.start();
