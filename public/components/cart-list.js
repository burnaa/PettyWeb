class CartList extends HTMLElement {
    constructor() {
        super();
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
        this.innerHTML = ''; // Өмнөх контентыг цэвэрлэх

        const productList = document.createElement('aside');
        productList.classList.add('listcart');

        if (this.cartItems.length > 0) {
            this.cartItems.forEach(item => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `
                    <p>Нэр: ${item.name} - ${item.size} - ${item.color}</p>
                    <p>Үнэ: ${item.number} * ${item.price}₮ = ${item.number * item.price}₮</p>
                    <hr>
                `;
                productList.appendChild(productDiv);
            });
        } else {
            productList.innerHTML = `<p>Сагс хоосон байна.</p>`;
        }

        this.appendChild(productList);
    }

    updateCart() {
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        this.render();
    }
}

customElements.define('cart-list', CartList);
