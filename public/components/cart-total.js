class CartTotal extends HTMLElement {
    constructor() {
        super();
        this.totalPrice = 0; // Нийт үнийг хадгалах
    }

    connectedCallback() {
        this.render(); // Анхны UI-г хоосон байдлаар үүсгэх
    
        // CustomEvent сонсох
        document.addEventListener('productAddedToCart', (event) => {
            //const product = event.detail; // Event доторх бүтээгдэхүүний бүх мэдээллийг авах
            this.addProductAndRecalculate(event.detail.price); // Нийт дүнг шинэчлэх
        });
    }
    
    // Шинэ бүтээгдэхүүн нэмэх, нийт дүнг тооцоолох
    addProductAndRecalculate(p) {
        this.totalPrice += p; // Нийт дүнг нэмэгдүүлэх
        console.log(`Updated Total Price: ${this.totalPrice}`);
        this.render();
    }
    
    render() {
        this.innerHTML = `
            <div class="total-price">
                <pre>   Нийт дүн: ${this.totalPrice}₮</pre>
            </div>
        `;
    }
    
    
}

customElements.define('cart-total', CartTotal);