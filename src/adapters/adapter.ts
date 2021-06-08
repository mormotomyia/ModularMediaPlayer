/*
 * COPYRIGHT @MATHIAS HÜTTENMÜLLER 2021
 * LICENSE GPLv3
 */

import { MediaType } from '../visuals/media-canvas';
import { IInput, MediaCanvasFactory } from '../visuals/media-canvas-factory';

export interface IMediaPlayerAdapter {
    send: (output: object) => void;
    start: (receiveFunc: (input: IInput) => void) => void; // setup logic
    stop: () => void; // teardown
}

export class Adapter {
    adapter: IMediaPlayerAdapter;
    canvasFactory: MediaCanvasFactory;

    constructor(adapter: IMediaPlayerAdapter, canvas: MediaCanvasFactory) {
        this.adapter = adapter;
        this.canvasFactory = canvas;
    }

    receive(input: IInput) {
        if (input.duration && input.media) {
            this.canvasFactory.setMedia(
                input.layer,
                input.duration,
                input.media
            );
        } else {
            this.canvasFactory.endMedia(input.layer);
        }
    }

    send(message: object): void {
        this.adapter.send(message);
    }

    start() {
        this.canvasFactory.setAdapterCallback(this.send);
        this.adapter.start(this.receive.bind(this));
    }

    stop() {
        this.adapter.stop();
    }
}
