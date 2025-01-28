import Product from "./product.js";
import Cart from "./cart.js";
import Data from "./data.js";

// app объект үүсгэх
const app = {};

// Сагсны обьект үүсгэх
const sags = new Cart();
app.cart = sags;

// // Бүтээгдэхүүний мэдээллийг API-аас авах
// const data = new Data("https://api.jsonbin.io/v3/...");
// app.products = await data.refreshData(); // Бүтээгдэхүүний мэдээллийг авна

// // Бүтээгдэхүүн бүрийг UI дээр харуулах
// let productsHTML = "";
// app.products.forEach((productData) => {
//     const product = new Product(productData);
//     productsHTML += product.render();
//     setTimeout(() => product.setupAddToCartButton(app.cart)); // Add-to-Cart тохиргоо
// });

// // Бүтээгдэхүүний HTML-ийг оруулах
// document.getElementById("prodSection").innerHTML = productsHTML;
