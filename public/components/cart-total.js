// class CartTotal extends HTMLElement {
//     constructor() {
//         super();
//         this.totalPrice = 0; // Нийт үнийг хадгалах
//     }

//     connectedCallback() {
//         this.render(); // Анхны UI-г хоосон байдлаар үүсгэх
//         window.addEventListener('productAddedToCart', (event) => {
//             console.log("📢 Custom Event хүлээж авлаа:", event);
//             console.log("📦 Event detail:", event.detail);
        
//             const product = event.detail?.product; // ✅ event.detail нь байхгүй бол алдаа гарахаас сэргийлнэ
//             if (!product) return; // event.detail байхгүй бол return хийнэ
        
//             this.addProductAndRecalculate(product.price);
//         });
        
//     }

//     // ✅ Нийт дүнг шинэчлэх
//     addProductAndRecalculate(price) {
//         this.totalPrice += price; // Нийт дүнг нэмэгдүүлэх
//         console.log(`Updated Total Price: ${this.totalPrice}₮`);
//         this.render();
//     }

//     render() {
//         this.innerHTML = `
//             <div class="total-price">
//                 <pre>   🛒 Нийт дүн: ${this.totalPrice}₮</pre>
//             </div>
//         `;
//     }
// }

// customElements.define('cart-total', CartTotal);
