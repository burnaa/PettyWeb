import "./my-cart.js" 
class MainProduct extends HTMLElement {
    constructor() {
        super();
        this._productId = null; 
    }

    // Аттрибутуудыг ажиглах
    static get observedAttributes() {
        return ['product-id'];
    }

    // Аттрибут өөрчлөгдөх үед
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'product-id' && oldValue !== newValue) {
            this.productId = newValue; 
        }
    }

    get productId() {
        return this._productId;
    }

    set productId(value) {
        if (this._productId !== value) {
            this._productId = value;
            console.log(`Property 'productId' changed to ${value}`);
            this.fetchProductData(value); 
        }
    }

    // Бүтээгдэхүүний өгөгдөл татах
    async fetchProductData(productId) {
        try {
            const response = await fetch(`http://localhost:3000/products/${productId}`);
            if (response.ok) {
                const prod = await response.json();
                if (!prod) {
                    throw new Error("Бүтээгдэхүүний өгөгдөл хоосон байна!");
                }
                this.initializeProduct(prod);
            } else {
                console.error('Бүтээгдэхүүний мэдээллийг авахад алдаа гарлаа:', response.status);
                this.innerHTML = `<p>Алдаа: Бүтээгдэхүүний мэдээлэл олдсонгүй.</p>`;
            }
        } catch (error) {
            console.error('Алдаа:', error);
            this.innerHTML = `<p>Алдаа: Сервертэй холбогдох боломжгүй байна.</p>`;
        }
    }

    initializeProduct(prod) {
        this.id = prod.prod_id;
        this.name = prod.prod_name;
        this.code = prod.prod_code;
        this.type = prod.prod_type;
        this.animal = prod.prod_animal;
        this.size = prod.prod_size;
        this.color = Array.isArray(prod.colors)
            ? prod.colors.map(color => color)
            : ["Тодорхойгүй"];
        this.origin = prod.origin;
        this.certification = prod.certification;
        this.subpic = prod.subpic;
        this.startDate = prod.start_date;
        this.endDate = prod.end_date;
        this.piece = prod.piece;
        this.price = prod.price;
        this.number = 1;
        this.render(); 
        this.setupAddToCartButton(); 
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
                number: this.number,
                piece:this.piece
            };
            console.log(productData);

            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            cartItems.push(productData);
            localStorage.setItem('cart', JSON.stringify(cartItems));

            // CustomEvent үүсгэж дамжуулах
            const event = new CustomEvent('productAddedToCart', {
                detail: {product : productData},
            });
            
            console.log("CustomEvent dispatched:", event);
            window.dispatchEvent(event);

            alert("Бүтээгдэхүүнийг сагсанд нэмлээ!");

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
        if (this.hasAttribute('product-id')) {
            this.productId = this.getAttribute('product-id'); 
        }
    }

}

window.customElements.define('main-product', MainProduct);
