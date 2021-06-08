/*
 * COPYRIGHT @MATHIAS HÜTTENMÜLLER 2021
 * LICENSE GPLv3
 */

import { MediaCanvas, IScreen, MediaType } from './media-canvas';

export interface IMediaCanvasFactory {
    // setMedia
}

export interface IInput {
    layer: number;
    duration?: number;
    media?: Array<{ element: string; type: typeof MediaType; source: string }>;
}

export class MediaCanvasFactory {
    layers: Map<Number, MediaCanvas> = new Map();
    callback: (input: object) => void;

    // welcome to Java, little JavaScript
    constructor(
        root: HTMLElement,
        layerCount: number,
        dimensions: { x: number; y: number },
        screens: IScreen,
        debug: boolean
    ) {
        for (let index = 0; index < layerCount; index++) {
            this.layers.set(
                index,
                new MediaCanvas(root, index, dimensions, screens, debug)
            );
        }

        this.render();
    }

    setAdapterCallback(callback: (input: object) => void) {
        this.callback = callback;
    }

    render(): void {
        for (let [key, layer] of this.layers) {
            layer.render();
        }
    }

    endMedia(layer: number): void {
        clearTimeout(this.layers.get(layer).timeout);
        clearTimeout(this.layers.get(layer).startTimeout);
        this.layers.get(layer).defaultContentEndAction(true);
    }

    setMedia(
        layer: number,
        duration: number,
        media: Array<{
            element: string;
            type: typeof MediaType;
            source: string;
        }>
    ): void {
        this.layers.get(layer).setMedias(media);
        if (duration >= 1) {
            clearTimeout(this.layers.get(layer).timeout);
            clearTimeout(this.layers.get(layer).startTimeout);
            this.layers.get(layer).timeout = setTimeout(
                () => this.layers.get(layer).defaultContentEndAction(false),
                duration * 1000 + new Date().getMilliseconds()
            );
        }
    }
}
