import { IMediaElement } from '../bases/IMediaElement';
import { CustomMormoBanner } from './custom-banner';
import { CustomMormoVideo } from './custom-video';

export class MediaElement implements IMediaElement {
    canvas: HTMLDivElement;
    video: CustomMormoVideo[];
    image: HTMLImageElement[];
    banners: CustomMormoBanner[];
    canplay: boolean;
    private _active: 0 | 1;

    constructor(canvas: HTMLDivElement, canplay: boolean) {
        this.canvas = canvas;
        this.constructCanvas(this.canvas);
        this.canplay = canplay;
        this._active = 0;
    }

    get allUsedItem(): Array<HTMLElement> {
        const array = [];
        array.push(this.activeBanner);
        array.push(this.activeImage);
        array.push(this.activeVideo);
        return array;
    }

    get allUnusedItem(): Array<HTMLElement> {
        const array = [];
        array.push(this.inactiveBanner);
        array.push(this.inactiveImage);
        array.push(this.inactiveVideo);
        return array;
    }

    constructCanvas(canvasElement: HTMLDivElement) {
        this.image = [];
        this.video = [];
        this.banners = [];
        for (let index = 0; index < 2; index++) {
            const bannerElement = new CustomMormoBanner();

            const imageElement = <HTMLImageElement>(
                document.createElement('img')
            );

            const videoElement = new CustomMormoVideo();
            if (index === 0) {
                imageElement.classList.add('hide');
                videoElement.classList.add('hide');
                bannerElement.classList.add('hide');
            }
            if (index === 1) {
                imageElement.classList.add('hide');
                videoElement.classList.add('hide');
                bannerElement.classList.add('hide');
            }
            canvasElement.appendChild(bannerElement);
            canvasElement.appendChild(videoElement);
            canvasElement.appendChild(imageElement);
            this.banners.push(bannerElement);
            this.image.push(imageElement);
            this.video.push(videoElement);
        }
    }

    get activeImage() {
        return this.image.find((e) => e.className === `show`);
    }

    get activeVideo() {
        return this.video.find((e) => e.className === `show`);
    }

    get activeBanner() {
        return this.banners.find((e) => e.className === `show`);
    }

    get videoToShow() {
        return this.video.find((e) => e.className === `unhide`);
    }
    get imageToShow() {
        return this.image.find((e) => e.className === `unhide`);
    }
    get bannerToShow() {
        return this.banners.find((e) => e.className === `unhide`);
    }

    get inactiveImage() {
        return this.image.find((e) => e.className === `hide`);
    }

    get inactiveVideo() {
        return this.video.find((e) => e.className === `hide`);
    }

    get inactiveBanner() {
        return this.banners.find((e) => e.className === `hide`);
    }

    swapElements(elements: Array<HTMLElement>, keyword?: string) {
        elements.forEach((element) => {
            if (keyword) {
                element.className = keyword;
            } else {
                switch (element.className) {
                    case 'show':
                        element.className = 'hide';
                        break;
                    case 'unhide':
                        element.className = 'show';
                        break;
                    case 'hide':
                        element.className = 'hide';
                        break;
                }
            }
        });
    }

    swap(keyword?: string) {
        this.swapElements(this.image, keyword);
        this.swapElements(this.video, keyword);
        this.swapElements(this.banners, keyword);
    }
}
