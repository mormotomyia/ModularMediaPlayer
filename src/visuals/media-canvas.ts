import { IMediaElement } from '../bases/IMediaElement';
import { CustomMormoBanner } from './custom-banner';
import { CustomMormoVideo } from './custom-video';
import { MediaElement } from './MediaElement';

/**
 * @author Mathias Hüttenmüller
 * @copyright Mathias Hüttenmüller 2021
 * @license
 */

/**
 * defines the screen position on the canvas
 */
export interface IScreen {
    [key: string]: {
        p1: { x: number; y: number };
        p2: { x: number; y: number };
        rotate: any;
    };
}

interface IMedia {
    [key: string]: IMediaElement;
}

export const MediaType = 'video' || 'image' || 'text';

// export enum MediaType {

//     Video = 'video',
//     Image = 'image',
//     Text = 'text',
// }

export class MediaCanvas {
    startTimeout: any;
    timeout: any;
    defaultContentEndAction: Function = (arg: boolean) => this.hideAll(arg);
    // (this.rootelement.style.display = 'none');
    // contentEndAction: Function = this.defaultContentEndAction;
    container: HTMLElement;
    rootelement: HTMLElement;
    mediaContainers: Map<string, IMediaElement> = new Map();
    swapper: IMediaElement[];

    // p1 = upper left pixel
    // p2 = lower right pixel

    // example usage:
    // MediaCanvas({1920,1080},[{{0,0},{1920,1080}}]) -> one FHD screen
    // MediaCanvas({3840,1080},[{0,0},{1920,1080}},{{1920,0},{3840,1080}}]) -> two FHD screens side by side
    // MediaCanvas({1920,2160},{0:{'p1':{0,0},'p2':{1920,1080}},1:{'p1':{0,1080},'p2':{1920,2160}}}) -> two FHD screens bewlow one another

    constructor(
        container: HTMLElement,
        layer: number,
        canvas_size: { x: number; y: number },
        screens: IScreen,
        debug: boolean
    ) {
        this.container = container;

        this.rootelement = document.createElement('div');
        this.rootelement.classList.add('media-canvas');
        this.rootelement.id = layer.toString();
        this.rootelement.setAttribute(
            'style',
            `display:none; z-index:${layer}; height:${canvas_size.y}px ; width:${canvas_size.x}px ; left:0px; top: 0px; position: absolute; overflow: hidden;`
        );

        if (debug) {
            this.rootelement.setAttribute(
                'style',
                `${this.rootelement.getAttribute(
                    'style'
                )};background-color:rgb(50,30,120)`
            );
        }

        Object.entries(screens).forEach((element: Array<any>) => {
            const canvasElement = document.createElement('div');
            canvasElement.classList.add('canvas-element');
            canvasElement.id = element[0];
            if (!element[1].rotate) {
                // console.log(element[1].p1)
                // {p1: { x:number, y:number}, p2: { x:number, y:number}}

                canvasElement.setAttribute(
                    'style',
                    `height:${element[1].p2.y - element[1].p1.y}px ;
                    width:${element[1].p2.x - element[1].p1.x}px ;
                    left:${element[1].p1.x}px;
                    top: ${element[1].p1.y}px;
                    position: absolute;
                    overflow: hidden`
                );
            } else {
                // math time!
                canvasElement.setAttribute(
                    'style',
                    `width:${element[1].p2.y - element[1].p1.y}px ;
                    height:${element[1].p2.x - element[1].p1.x}px ;
                    left:${
                        element[1].p1.x + element[1].p2.x - element[1].p1.x
                    }px; 
                    top: ${element[1].p1.y}px;
                    transform-origin:0% 0%;
                    transform: rotate(${
                        element[1].rotate !== true ? element[1].rotate : '90deg'
                    });
                    position: absolute; overflow: hidden
                    `
                );
            }
            this.createMediaElements(canvasElement);

            if (debug) {
                canvasElement.setAttribute(
                    'style',
                    `${canvasElement.getAttribute(
                        'style'
                    )};background-color:rgb(${element[1].p2.x % 256},${
                        element[1].p2.y % 256
                    },50)`
                );
            }
            this.rootelement.appendChild(canvasElement);
        });
    }

    render(containerOverride?: HTMLElement) {
        if (containerOverride !== null) {
            this.container.appendChild(this.rootelement);
        }
    }

    private createMediaElements(canvasElement: HTMLDivElement) {
        this.mediaContainers.set(
            canvasElement.id,
            new MediaElement(canvasElement, false)
        );
    }

    private playableCallback(element: string, dom: HTMLElement): void {
        // console.log('ready Check');
        this.checkReady();
    }

    private checkReady(): void {
        // console.log(this.swapper);
        if (
            this.swapper.every((value: IMediaElement) => {
                const helperVideo = value.video.find(
                    (e) => e.className === `unhide`
                );
                const helperImage = value.image.find(
                    (e) => e.className === `unhide`
                );
                const helperBanner = value.banners.find(
                    (e) => e.className === `unhide`
                );
                if (
                    helperVideo !== null &&
                    helperVideo !== undefined &&
                    helperVideo.complete
                )
                    return true;
                if (
                    helperImage !== null &&
                    helperImage !== undefined &&
                    helperImage.complete
                )
                    return true;
                if (
                    helperBanner !== null &&
                    helperBanner !== undefined &&
                    helperBanner.complete
                )
                    return true;
                return false;
            })
        ) {
            // console.log(`${new Date()} passed check`);
            clearTimeout(this.startTimeout);
            this.startTimeout = setTimeout(() => this.start(), 10);
            // console.log(this.startTimeout);
        }
    }

    private start(): void {
        this.swapper.forEach((value: IMediaElement) => {
            if (value.videoToShow !== undefined) {
                value.videoToShow.muted = true;
                value.videoToShow.play();
            }
            // console.log(value);
            value.swap();
            console.log(`start: ${Date.now()}`);
        });

        this.rootelement.style.display = 'block';
    }

    hideAll(arg: boolean) {
        if (arg) {
            this.rootelement.style.display = 'none';
        }
        console.log(`hide all: ${Date.now()}`);
        console.log(this.rootelement.id);

        this.mediaContainers.forEach((value) => {
            value.swap('hide');
        });
    }

    setMedias(
        media: Array<{
            element: string;
            type: typeof MediaType;
            source: string;
        }>
    ): void {
        // console.log(media);
        this.swapper = [];
        media.forEach((value) => {
            const { element, type, source } = value;
            const alreadyActive = this.setMedia(element, type, source);
            if (!alreadyActive)
                this.swapper.push(this.mediaContainers.get(element));
        });
    }

    private setImage(element: string, source: string) {
        let img: HTMLImageElement;
        try {
            img = this.mediaContainers
                .get(element)
                .image.find((e) => e.className === `unhide`);
            if (img == undefined) {
                throw 'no element in hiding!';
            }
        } catch (e) {
            img = this.mediaContainers
                .get(element)
                .image.find((e) => e.className === `hide`);
        }
        img.setAttribute('src', source);
        img.onload = () => this.playableCallback(element, img); // wtf! this is amazing!
        img.className = 'unhide';
    }

    private setVideo(element: string, source: string) {
        let video: CustomMormoVideo;
        try {
            video = this.mediaContainers
                .get(element)
                .video.find((e) => e.className === `unhide`);
            if (video == undefined) {
                throw 'no element in hiding!';
            }
        } catch (e) {
            video = this.mediaContainers
                .get(element)
                .video.find((e) => e.className === `hide`);
        }

        video
            .getElementsByTagName('source')
            .item(0)
            .setAttribute('src', source);
        video.oncanplaythrough = () => this.playableCallback(element, video); // wtf! this is amazing!

        video.className = 'unhide';
        video.load();
    }

    private setBanner(element: string, source: string) {
        let banner: CustomMormoBanner;
        try {
            banner = this.mediaContainers
                .get(element)
                .banners.find((e) => e.className === `unhide`);
            if (banner == undefined) {
                throw 'no element in hiding!';
            }
        } catch (e) {
            banner = this.mediaContainers
                .get(element)
                .banners.find((e) => e.className === `hide`);
        }

        banner.className = 'unhide';
        banner.onload = () => this.playableCallback(element, banner);
        fetch(source, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'reload', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
        })
            .then((response) => response.json())
            .then((data) => {
                banner.render(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    setMedia(element: string, type: typeof MediaType, source: string): boolean {
        // should prefer selecting items in unhide

        switch (type) {
            case 'video':
                const vidActive = this.mediaContainers
                    .get(element)
                    .video.find((e) => e.className === `show`);
                if (vidActive == undefined) {
                    this.setVideo(element, source);
                } else if (vidActive.src == source) {
                    console.log('already active');
                    return true;
                } else {
                    this.setVideo(element, source);
                }

                break;

            case 'image':
                const imgActive = this.mediaContainers
                    .get(element)
                    .image.find((e) => e.className === `show`);
                if (imgActive === undefined) {
                    this.setImage(element, source);
                } else if (imgActive.src == source) {
                    console.log('already active');
                    return true;
                } else {
                    this.setImage(element, source);
                }
                break;

            case 'text':
                this.setBanner(element, source);
                break;
            default:
                break;

                return false;
        }
    }
}
