class CartTotal extends HTMLElement {
    constructor() {
        super();
        this.totalPrice = 0;
    }

    connectedCallback() {
        this.calculateTotalFromLocalStorage();
        this.render();
    }

    calculateTotalFromLocalStorage() {
        // LocalStorage-аас өгөгдлийг авах
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Нийт дүнг тооцоолох
        this.totalPrice = cartItems.reduce((sum, item) => {
            return sum + (item.number * item.price);
        }, 0);
    }

    render() {
        // Нийт дүнг харуулах HTML-г шинэчлэх
        this.innerHTML = `
            <div class="total-price">
                <pre>   Нийт дүн: ${this.totalPrice}₮</pre>
            </div>
        `;
    }

    updateTotalFromEvent(cartItems) {
        // Custom event-ээс ирсэн өгөгдөл дээр үндэслэн нийт дүнг шинэчлэх
        this.totalPrice = cartItems.reduce((sum, item) => sum + (item.number * item.price), 0);
        this.render(); // Шинэчлэгдсэн дүнг харагдуулах
    }
}

customElements.define('cart-total', CartTotal);
