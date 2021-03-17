import { CustomMormoBanner } from '../visuals/custom-banner';
import { CustomMormoVideo } from '../visuals/custom-video';

export interface IMediaElement {
    canvas: HTMLDivElement;
    video: Array<CustomMormoVideo>;
    image: Array<HTMLImageElement>;
    banners: Array<CustomMormoBanner>;
    canplay: boolean;
    // tempContainerVideo?:CustomMormoVideo,
    // tempContainerImage?:HTMLImageElement,
    swap(keyword?: string): void;
    activeVideo: CustomMormoVideo;
    inactiveVideo: CustomMormoVideo;
    videoToShow: CustomMormoVideo;
    activeImage: HTMLImageElement;
    inactiveImage: HTMLImageElement;
    imageToShow: HTMLImageElement;
    activeBanner: CustomMormoBanner;
    inactiveBanner: CustomMormoBanner;
    bannerToShow: CustomMormoBanner;

    allUsedItem: Array<HTMLElement>;
    allUnusedItem: Array<HTMLElement>;
}
