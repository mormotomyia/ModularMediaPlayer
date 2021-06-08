/*
 * COPYRIGHT @MATHIAS HÜTTENMÜLLER 2021
 * LICENSE GPLv3
 */

import { CustomElement } from '../bases/custom-element-base';
import { IBanner } from '../interfaces/IBanner';

@CustomElement({
    selector: 'mormo-banner',
    template: `<div></div>`,
    style: `left:0; top:0; width:inherit; height:inherit`,
    useShadow: false,
})
export class CustomMormoBanner extends HTMLElement {
    private _loaded: boolean = false;

    constructor() {
        super();
        // this.connectedCallback();
        // this is hacking the template into existence before the call to connectedCallback.
        // Usually you want to create the template on adding it to the DOM.
        // I want to abuse HTMLVideoElements which arent connected to the DOM to store additional state.
        //
        this.instanciate();
    }

    get loaded() {
        return this._loaded;
    }

    get complete() {
        return this.loaded;
    }

    onload: any = () => {
        this._loaded = true;
    };

    render(template: IBanner) {
        this.setContent(template.content);
        Object.keys(template.style).forEach((key) => {
            console.log(document.querySelector(key).getAttribute('style'));
            const item = document.querySelector(key);
            item.setAttribute(
                'style',
                `${
                    item.getAttribute('style') === null
                        ? ''
                        : item.getAttribute('style')
                }; ${JSON.stringify(template.style[key])
                    .substring(
                        1,
                        JSON.stringify(template.style[key]).length - 1
                    )
                    .split(',')
                    .join(';')
                    .split('"')
                    .join('')}`
            );
        });
        Object.keys(template.animate).forEach((key) => {
            const item = document.querySelector(key);

            item.animate(
                template.animate[key].keyframes,
                template.animate[key].options
            );
        });

        this.onload();
    }

    setContent(content: string) {
        this.innerHTML = content;
    }

    instanciate() {}

    connectedCallback() {}

    disconnectedCallback() {}

    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidUnmount() {}
}
