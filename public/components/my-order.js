class MyOrder extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const template = document.createElement("template");
        template.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    border: 1px solid var(--color-border, #ddd);
                    border-radius: 10px;
                    margin: 10px;
                    padding: 20px;
                    width: 15%;
                    box-shadow: var(--shadow-2, 0 4px 8px rgba(0, 0, 0, 0.1));
                    background-color: var(--bg-color, white);
                    text-align: center;
                    transition: transform 0.3s ease-in-out;
                }

                :host(:hover) {
                    transform: scale(1.05);
                }

                :host([data-state="available"]) {
                    background-color: var(--bg-sale, #ffffff);
                    border-color:rgb(239, 65, 155);
                }

                :host([data-state="sold-out"]) {
                    background-color: var(--bg-sold, #f8d7da);
                    opacity: 0.6;
                    pointer-events: none;
                }

                img {
                    max-width: 100%;
                    height: 10rem;
                    border-radius: 10px;
                }

                .product-name {
                    font-size: 18px;
                    font-weight: bold;
                    margin: 10px 0;
                }

                .price {
                    font-size: 16px;
                    color: var(--text-color, black);
                }

                .quantity {
                    font-size: 14px;
                    font-weight: bold;
                    color: gray;
                }

                .product-info {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .stock-status {
                    font-size: 14px;
                    font-weight: bold;
                    color: red;
                }

                .buy-button {
                    padding: 8px 15px;
                    font-size: 14px;
                    font-weight: bold;
                    border: none;
                    border-radius: 5px;
                    background-color: #28a745;
                    color: white;
                    cursor: pointer;
                }

                .buy-button:disabled {
                    background-color: gray;
                    cursor: not-allowed;
                }
            </style>

            <section class="product">
                <aside id="egnee">
                    <h3 class="product-name"><slot name="name">Default Product</slot></h3>
                </aside>
                <pre><slot name="color">Улаан</slot>  <slot name="size">XS</slot></pre>
                <a href="oneProduct.html">
                    <img src="" alt="Product Image">
                </a>
                <p class="quantity"><slot name="quantity">0 ширхэг</slot></p>
                <p class="price"><slot name="price">$0.00</slot></p>
                <p class="stock-status">✅ Бэлэн байна!</p>
                <button class="buy-button">Авах</button>
            </section>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["image", "number", "piece"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "image") {
            this.shadowRoot.querySelector("img").src = newValue;
        } else if (name === "number" || name === "piece") {
            this.updateState();
        }
    }

    updateState() {
        const number = parseInt(this.getAttribute("number")) || 0;
        const piece = parseInt(this.getAttribute("piece")) || 0;
        const statusText = this.shadowRoot.querySelector(".stock-status");
        const buyButton = this.shadowRoot.querySelector(".buy-button");

        if (number > piece) {
            this.setAttribute("data-state", "sold-out");
            statusText.textContent = "⚠️ Бэлэн бараа дууссан!";
            buyButton.disabled = true;
        } else {
            this.setAttribute("data-state", "available");
            statusText.textContent = "✅ Бэлэн байна!";
            buyButton.disabled = false;
        }
    }

    connectedCallback() {
        this.updateState();
    }
}

window.customElements.define("my-order", MyOrder);
