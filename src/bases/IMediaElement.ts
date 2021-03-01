import { CustomMormoBanner } from '../visuals/custom-banner';
import { CustomMormoVideo } from '../visuals/custom-video';

export interface IMediaElement {
    activeNonUsed(video: HTMLElement): Array<HTMLElement>;
    canvas: HTMLDivElement;
    video: Array<CustomMormoVideo>;
    image: Array<HTMLImageElement>;
    banners: Array<CustomMormoBanner>;
    canplay: boolean;
    // tempContainerVideo?:CustomMormoVideo,
    // tempContainerImage?:HTMLImageElement,
    swap: Function;
    activeVideo: CustomMormoVideo;
    activeImage: HTMLImageElement;
    inactiveVideo: CustomMormoVideo;
    inactiveImage: HTMLImageElement;
    activeBanner: CustomMormoBanner;
    inactiveBanner: CustomMormoBanner;

    allUsedItem: Array<HTMLElement>;
    allUnusedItem: Array<HTMLElement>;
}

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

    activeNonUsed(used: HTMLElement): Array<HTMLElement> {
        const array = [];
        console.log(used.nodeName);
        switch (used.nodeName) {
            case 'VIDEO':
                array.push(this.activeBanner);
                array.push(this.activeImage);
                break;

            case 'IMG':
                array.push(this.activeBanner);
                array.push(this.activeVideo);
                break;

            case 'MORMO-BANNER':
                array.push(this.activeVideo);
                array.push(this.activeImage);
                break;
        }
        console.log(array);
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

            imageElement.style.position = 'fixed';
            imageElement.style.left = 'inherit';
            imageElement.style.top = 'inherit';
            imageElement.style.display = 'block';
            imageElement.style.opacity = '0';

            const videoElement = new CustomMormoVideo();
            videoElement.style.display = 'block';
            videoElement.style.opacity = '0';
            if (index === 0) {
                imageElement.classList.add('active');
                videoElement.classList.add('active');
                bannerElement.classList.add('active');
            }
            if (index === 1) {
                imageElement.classList.add('inactive');
                videoElement.classList.add('inactive');
                bannerElement.classList.add('inactive');
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
        return this.image.find((e) => e.className === `active`);
    }

    get activeVideo() {
        return this.video.find((e) => e.className === `active`);
    }

    get activeBanner() {
        return this.banners.find((e) => e.className === `active`);
    }

    get inactiveImage() {
        return this.image.find((e) => e.className === `inactive`);
    }

    get inactiveVideo() {
        return this.video.find((e) => e.className === `inactive`);
    }

    get inactiveBanner() {
        return this.banners.find((e) => e.className === `inactive`);
    }

    swapElements(elements: Array<HTMLElement>) {
        elements.forEach((element) => {
            element.classList.contains('active')
                ? (element.className = 'inactive')
                : (element.className = 'active');
        });
    }

    // swapVideos(videos:Array<CustomMormoVideo>){
    //     videos.forEach(element => {
    //         element.classList.contains('active')?element.className = 'inactive':element.className = 'active'
    //     })
    // }

    swap() {
        // console.log('swap!')
        this.swapElements(this.image);
        this.swapElements(this.video);
        this.swapElements(this.banners);
    }
}
