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

    onload: any = () => {
        this._loaded = true;
        // console.log('load')
    };

    render(template: IBanner) {
        this.setContent(template.content);
        Object.keys(template.style).forEach((key) => {
            // console.log(key,JSON.stringify(template.style[key]).substring(1,JSON.stringify(template.style[key]).length-1).replaceAll(',',';').replaceAll('"',''))
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
                    .replaceAll(',', ';')
                    .replaceAll('"', '')}`
            );
            // document.querySelector(key).setAttribute("style","color:red")
        });
        Object.keys(template.animate).forEach((key) => {
            const item = document.querySelector(key);
            // console.log(item);
            // console.log(template.animate[key].keyframes);
            // console.log(template.animate[key].options);
            item.animate(
                template.animate[key].keyframes,
                template.animate[key].options
            );
        });
        // this.setAttribute('style',template.style)
        this.onload();
    }

    setContent(content: string) {
        this.innerHTML = content;
    }

    instanciate() {
        // throw new Error("Method not implemented.");
    }

    connectedCallback() {}

    disconnectedCallback() {}

    componentWillMount() {}

    componentDidMount() {
        // console.log('component did mount');
        // console.log(new Date().getMilliseconds());
    }

    componentWillUnmount() {
        // console.log('component will unmount');
    }

    componentDidUnmount() {
        // console.log('component did unmount');
    }
}
