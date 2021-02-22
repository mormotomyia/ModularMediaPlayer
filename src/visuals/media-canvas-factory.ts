import { MediaCanvas, IScreen, MediaType } from './media-canvas';

export class MediaCanvasFactory {
    layers: Map<Number, MediaCanvas> = new Map();
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
    }

    render(): void {
        for (let [key, value] of this.layers) {
            value.render();
            // console.log(`${key}, ${value.rootelement}`)
        }
    }

    setMedia(layer: number):void;
    setMedia(
        layer: number,
        duration?: number,
        media?: Array<{ element: string; type: MediaType; source: string }>
    ):void;
    setMedia(
        layer: number,
        duration?: number,
        media?: Array<{ element: string; type: MediaType; source: string }>
    ): void {
        if (!media) {
            // end all playing content!

            clearTimeout(this.layers.get(layer).timeout);
            clearTimeout(this.layers.get(layer).startTimeout);
            this.layers.get(layer).defaultContentEndAction();


        } else {
            this.layers.get(layer).setMedias(media);
            if (duration < 1) {
                // wtf is this? dont do anything?!?!
            } else {
                clearTimeout(this.layers.get(layer).timeout);
                clearTimeout(this.layers.get(layer).startTimeout);
                this.layers.get(layer).timeout = setTimeout(
                    this.layers.get(layer).defaultContentEndAction,
                    duration * 1000 + new Date().getMilliseconds()
                );
            }
        }
    }
}
