interface CustomElementConfig {
    selector: string;
    template: string;
    style?: string;
    useShadow?: boolean;
    extender?: string;
}

const noop = () => {};

const validateSelector = (selector: string) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};

export const CustomElement = (config: CustomElementConfig) => (cls:any) => {
    validateSelector(config.selector);
    if (!config.template) {
        throw new Error('You need to pass a template for the element');
    }
    const template = document.createElement('template');
    if (config.style) {
        config.template = `<style>${config.style}</style> ${config.template}`;
    }
    template.innerHTML = config.template;
    const connectedCallback = cls.prototype.connectedCallback || noop;
    const disconnectedCallback = cls.prototype.disconnectedCallback || noop;

    cls.prototype.instanciate = function () {
        const clone = document.importNode(template.content, true);
        if (config.useShadow) {
            this.attachShadow({ mode: 'open' }).appendChild(clone);
        } else {
            this.style = config.style;
            this.appendChild(clone);
        }
    };

    cls.prototype.connectedCallback = function () {
        // const clone = document.importNode(template.content, true);
        // if (config.useShadow) {
        //     this.attachShadow({mode: 'open'}).appendChild(clone);
        // } else {
        //     this.appendChild(clone);
        // }

        if (this.componentWillMount) {
            this.componentWillMount();
        }
        connectedCallback.call(this);
        if (this.componentDidMount) {
            this.componentDidMount();
        }
    };

    cls.prototype.disconnectedCallback = function () {
        if (this.componentWillUnmount) {
            this.componentWillUnmount();
        }
        disconnectedCallback.call(this);
        if (this.componentDidUnmount) {
            this.componentDidUnmount();
        }
    };

    if (config.extender) {
        window.customElements.define(config.selector, cls, {
            extends: config.extender,
        });
    } else {
        window.customElements.define(config.selector, cls);
    }
};

// @CustomElement({
//     selector: 'custom-selector',
//     template: `<div>your content goes here</div>`,
//     style: `:host {
//       position: absolute;
//       bottom: 0;
//       left: 0;
//       right: 0;
//       background: #009cff;
//       padding: 16px;
//       border-top: 1px solid black;
//       font-size: 24px;
//     }`,
//     useShadow: false
// })
// export class MyName extends HTMLElement {
//     connectedCallback() {
//         // const elm = document.createElement('h3');
//         // elm.textContent = 'Boo!';
//         // this.shadowRoot.appendChild(elm);
//         // console.log('connected callback');
//     }

//     disconnectedCallback() {
//         console.log('disconnected callback');
//     }

//     componentWillMount() {
//         console.log('component will mount');
//     }

//     componentDidMount() {
//         console.log('component did mount');
//     }

//     componentWillUnmount() {
//         console.log('component will unmount');
//     }

//     componentDidUnmount() {
//         console.log('component did unmount');
//     }
// }

// window.addEventListener('DOMContentLoaded', () => {
//     const element = document.querySelector('ce-my-name');
//     setTimeout(()=> {
//         element.parentNode.removeChild(element);
//     }, 2000);
// });
