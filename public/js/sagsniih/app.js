
import Product from "./product.js";
import Cart, { count as sagsandBaigaaBaraaniiToo} from "./cart.js";
import Data from "./data.js";

const sags = new Cart();
app.cart = sags;
const data = new Data("https://api.jsonbin.io/v3/b/674e28d9e41b4d34e45e9fbe"); 
app.products = await data.refreshData();

console.log("Fetched products:", app.products);

let productsHTML = "";
app.products.forEach((productData) => {
    const product = new Product(productData);
    productsHTML += product.render();
    setTimeout(() => product.setupAddToCartButton(), 0);
});

document.getElementById("prodSection").innerHTML=productsHTML;
// if(sagsandBaigaaBaraaniiToo>0)
//     document.getElementById("cart").innerHTML= sags.render();

// app.refreshCart = _=> document.getElementById("cart").innerHTML = app.cart.render();
