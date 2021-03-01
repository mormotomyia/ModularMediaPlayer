export interface IBanner {
    root: string;
    style: { [key: string]: object };
    animate: {
        [key: string]: {
            keyframes: Array<Keyframe>;
            options: KeyframeAnimationOptions;
        };
    };
    content: string;
}
