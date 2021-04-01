import ReconnectingWebSocket from 'reconnecting-websocket';
import { MediaType } from '../visuals/media-canvas';
import { IInput } from '../visuals/media-canvas-factory';
import { IMediaPlayerAdapter } from './adapter';

const message = {
    content: [
        {
            key: 'screen_0',
            content_id: 'CBCC332870F45FB14F83B762FDE50297',
            content_type: 'image',
        },
        {
            key: 'screen_1',
            content_id: 'CDA32CF5833A32A4420D3C77FE1B0C6F',
            content_type: 'image',
        },
    ],
    duration: 5,
    overlay: false,
    overlays: new Array(),
    layer: 1,
    end_packet: false,
};

export interface EmsuContent {
    key: string;
    content_id: string;
    content_type: string;
}
export interface EmsuInput {
    duration: number;
    overlay: boolean;
    overlays: Array<EmsuInput>;
    layer: number;
    end_packet: boolean;
    content: Array<EmsuContent>;
}

export class EmsuWebSocketAdapter implements IMediaPlayerAdapter {
    connection: ReconnectingWebSocket;
    receiveFunc: (input: IInput) => void;
    // sendFunc: (output:object) => void;
    socketPath: string;
    contentPath: string;

    constructor(socketPath: string, contentPath: string) {
        this.socketPath = socketPath;
        this.contentPath = contentPath;
    }

    send(output: object) {
        console.log(`sent ${output} to websocket`);
        this.connection.send(JSON.stringify(output));
    }

    start(receiveFunc: (input: IInput) => void) {
        this.receiveFunc = receiveFunc;
        this.connection = this.websocket(this.socketPath);
        this.connection.onopen = (event) => {
            console.log(event);
        };
        this.connection.onerror = (error) => {
            console.log(error);
            fetch(`http://${this.contentPath}/error/${this.socketPath}`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'reload', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
            })
                .then(() => console.log('correct endpoint'))

                .catch((error) => {
                    console.error('Error:', error);
                });
        };
        this.connection.onmessage = (event: MessageEvent) => {
            const formatted = this.formatAsIInput(JSON.parse(event.data));

            this.receiveFunc(formatted);
            this.connection.send(event.data);
        };
    }

    formatAsIInput(data: EmsuInput) {
        console.log(`${data.end_packet}: ${data.layer}: ${Date.now()}`);
        if (data.end_packet) {
            console.log('END PACKET');
            return {
                layer: data.layer,
            };
        } else {
            return {
                layer: data.layer,
                duration: data.duration + 1,
                media: this.buildMedia(data.content),
            };
        }
    }

    private buildMedia(
        contentArray: Array<EmsuContent>
    ): Array<{ element: string; type: typeof MediaType; source: string }> {
        const mapped = contentArray.map((content: EmsuContent) => {
            return {
                type: <typeof MediaType>content.content_type,
                source: `http://${this.contentPath}/${content.content_id}`,
                element: content.key.replace('screen_', ''),
            };
        });

        return mapped;
    }

    stop() {
        this.connection.close(1000, 'ok');
    }

    private websocket(websocketLocation: string): ReconnectingWebSocket {
        const options = {
            maxReconnectionDelay: 5000,
            minReconnectionDelay: 1000 + Math.random() * 2000,
            reconnectionDelayGrowFactor: 1.3,
            minUptime: 5000,
            connectionTimeout: 2000,
            maxRetries: Infinity,
            maxEnqueuedMessages: Infinity,
            startClosed: false,
            debug: false,
        };
        let connection = new ReconnectingWebSocket(
            `ws://${websocketLocation}:8765`,
            [],
            options
        );
        return connection;
    }
}
