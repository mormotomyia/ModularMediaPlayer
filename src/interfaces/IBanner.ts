/*
 * COPYRIGHT @MATHIAS HÜTTENMÜLLER 2021
 * LICENSE GPLv3
 */

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
