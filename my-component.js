class MyComponent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: var(--bg-color, #ffffff);
                    color: var(--text-color, #000000);
                    padding: 20px;
                    border-radius: 5px;
                }
            </style>
            <slot></slot>
        `;
    }
}

customElements.define('my-component', MyComponent);
