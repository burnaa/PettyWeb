class CartList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Shadow DOM үүсгэнэ
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    }

    connectedCallback() {
        this.mergeCartItems();
        this.render();
    }

    mergeCartItems() {
        const mergedCartItems = [];
        this.cartItems.forEach(item => {
            const existingItem = mergedCartItems.find(existing =>
                existing.name === item.name &&
                existing.color === item.color &&
                existing.size === item.size
            );
            if (existingItem) {
                existingItem.number++;
            } else {
                mergedCartItems.push(item);
            }
        });

        // LocalStorage-д шинэчлэгдсэн өгөгдлийг хадгалах
        localStorage.setItem('cart', JSON.stringify(mergedCartItems));
        this.cartItems = mergedCartItems;
    }

    render() {
        // Бүтээгдэхүүний жагсаалтыг шинэчлэх
        const productList = document.createElement('aside');
        productList.classList.add('listcart');

        if (this.cartItems.length > 0) {
            this.cartItems.forEach(item => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `
                    <p>Нэр: ${item.name}--${item.size}-- ${item.color}</p>
                    <p>Үнэ: ${item.number} * ${item.price}₮ = ${item.number * item.price}₮</p>
                    <hr>
                `;
                productList.appendChild(productDiv);
            });
        } else {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Сагс хоосон байна.';
            productList.appendChild(emptyMessage);
        }

        this.shadowRoot.innerHTML = ''; // Shadow DOM-ийн өмнөх контентыг устгах
        this.shadowRoot.appendChild(productList);

        // Стилиудыг нэмэх
        const style = document.createElement('style');
        style.textContent = `
            .listcart {
                grid-area: content; /* Content талбар */
                overflow-y: auto;
                padding: 10px;
            }
            p {
                margin: 2px 0;
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    updateCart() {
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        this.render();
    }
}

customElements.define('cart-list', CartList);
