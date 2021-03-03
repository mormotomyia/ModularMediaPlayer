import { MediaType } from '../visuals/media-canvas';
import { IInput, MediaCanvasFactory } from '../visuals/media-canvas-factory';

export interface IMediaPlayerAdapter {
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
        // console.log(this.canvas);
        console.log(input);
        if (input.duration && input.media) {
            this.canvas.setMedia(input.layer, input.duration, input.media);
        } else {
            this.canvas.setMedia(input.layer);
        }
    }

    start(canvas: MediaCanvasFactory) {
        this.canvas = canvas;
        this.adapter.start(this.receive.bind(this));
    }

    stop() {
        this.adapter.stop();
    }
}
