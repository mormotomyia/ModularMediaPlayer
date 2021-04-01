import { MediaType } from '../visuals/media-canvas';
import { IInput, MediaCanvasFactory } from '../visuals/media-canvas-factory';

export interface IMediaPlayerAdapter {
    send: (output: object) => void;
    start: (receiveFunc: (input: IInput) => void) => void; // setup logik
    stop: () => void; // teardown
}

export class Adapter {
    adapter: IMediaPlayerAdapter;
    canvas: MediaCanvasFactory;

    constructor(adapter: IMediaPlayerAdapter) {
        this.adapter = adapter;
    }

    receive(input: IInput) {
        // console.log(input);
        if (input.duration && input.media) {
            this.canvas.setMedia(input.layer, input.duration, input.media);
        } else {
            this.canvas.setMedia(input.layer);
        }
    }

    send(message: object): void {
        this.adapter.send(message);
    }

    start(canvas: MediaCanvasFactory) {
        this.canvas = canvas;
        this.canvas.setAdapterCallback(this.send);
        this.adapter.start(this.receive.bind(this));
    }

    stop() {
        this.adapter.stop();
    }
}
