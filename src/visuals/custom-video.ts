/*
 * COPYRIGHT @MATHIAS HÜTTENMÜLLER 2021
 * LICENSE GPLv3
 */

import { CustomElement } from '../bases/custom-element-base';

@CustomElement({
    selector: 'mormo-video',
    template: `<source>`,
    style: `left:0; top:0`,
    useShadow: false,
    extender: 'video',
})
export class CustomMormoVideo extends HTMLVideoElement {
    constructor() {
        super();
        this.loop = false;
        this.autoplay = false;

        // this.connectedCallback();
        // this is hacking the template into existence before the call to connectedCallback.
        // Usually you want to create the template on adding it to the DOM.
        // I want to abuse HTMLVideoElements which arent connected to the DOM to store additional state.
        //
        this.instanciate();
    }

    instanciate() {
        // throw new Error("Method not implemented.");
    }

    connectedCallback() {}

    disconnectedCallback() {}

    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidUnmount() {}

    get playing() {
        return !!(
            this.currentTime > 0 &&
            !this.paused &&
            !this.ended &&
            this.readyState > 2
        );
    }

    get playable() {
        return !!(this.readyState > 2);
    }

    get complete() {
        return this.playable;
    }
}
