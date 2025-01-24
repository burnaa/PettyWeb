import "./my-cart.js"
class MainProduct extends HTMLElement {
    constructor() {
        super();
        this.id = null; // Анхнаасаа ID байхгүй
    }

    // Бүтээгдэхүүний ID-г ашиглан серверээс өгөгдөл татаж авах
    async fetchProductData(productId) {
        try {
            const response = await fetch(`http://localhost:3000/products/${productId}`);
            if (response.ok) {
                const prod = await response.json();
                this.initializeProduct(prod); // Бүтээгдэхүүний өгөгдлийг тохируулна
            } else {
                console.error('Бүтээгдэхүүний мэдээллийг авахад алдаа гарлаа.');
            }
        } catch (error) {
            console.log('Алдаа:', error);
        }
    }

    initializeProduct(prod) {
        this.id = prod.id;
        this.name = prod.name;
        this.code = prod.code;
        this.type = prod.type;
        this.animal = prod.animal;
        this.size = prod.size;
        this.color = prod.colors.map(color => color.label);
        this.origin = prod.origin;
        this.certification = prod.certification;
        this.subpic = prod.image;
        this.startDate = prod.startDate;
        this.endDate = prod.endDate;
        this.piece = prod.piece;
        this.price = prod.price;
        this.number = 1;
        this.render(); // Дэлгэц дээр харуулах
        this.setupAddToCartButton(); // "Сагсанд нэмэх" товчийг тохируулах
    }

    render() {
        this.innerHTML = `
            <div class="container">
                <div id="mainpicture">
                    <img class="big" src="${this.subpic}" alt="Main Product Image">
                </div>
                <article>
                    <h2 id="title">${this.name}</h2>
                    <pre>${this.type}</pre>
                    <pre>Хэмжээ: ${this.size} </pre>
                    <aside class="songolt">
                        <pre>Өнгө</pre>
                        <form>
                            ${this.color.map((color, index) => `
                                <input type="radio" name="choice_color" id="color${index + 1}" ${index === 0 ? 'checked' : ''}>
                                <label for="color${index + 1}">${color}</label>
                            `).join('')}
                        </form>
                    </aside>
                    <p id="uildverlesen">Үйлдвэрлэгдсэн огноо: ${this.startDate}</p>
                    <p id="expire">Дуусах огноо: ${this.endDate}</p>
                    <p id="origin">Бүтээгдэхүүний гарал: ${this.origin}</p>
                    <p id="standart">Баталгаажуулалт: ${this.certification}</p>
                    <span id="currency">${this.price}₮</span>
                    <br>
                    <button id="cart-button">🛒Сагсанд нэмэх🛒</button>
                </article>
            </div>`;
    }

    setupAddToCartButton() {
        const cartButton = this.querySelector('#cart-button');
        cartButton.addEventListener('click', () => {
            const colorElement = this.querySelector('input[name="choice_color"]:checked');
            if (!colorElement) {
                alert("Хэмжээ эсвэл өнгөө сонгоно уу.");
                return;
            }

            const productData = {
                id: this.id,
                name: this.name,
                size: this.size,
                color: colorElement.nextElementSibling.textContent,
                price: this.price,
                image: this.subpic,
                number: this.number
            };

            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            cartItems.push(productData);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            alert("Бүтээгдэхүүнийг сагсанд нэмлээ!");

            // Хэрэв 'my-cart' эсвэл 'app' тодорхойлогдсон бол ажиллуулна.
            if (document.getElementById("my-cart")) {
                document.getElementById("my-cart").addProduct(this.id);
            }
            if (typeof app !== 'undefined' && app.cart) {
                app.cart.addProduct(this.id);
                app.refreshCart();
            }
        });
    }

    connectedCallback() {
        const productId = this.getAttribute('product-id'); // Атрибутаас бүтээгдэхүүний ID-г авна
        if (productId) {
            this.fetchProductData(productId); // Бүтээгдэхүүний өгөгдлийг татаж авна
        }
    }
}

window.customElements.define('main-product', MainProduct);
