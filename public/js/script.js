// const url = window.location.href

// function addParams(){
//     let urlParams = new URLSearchParams(window.location.search);
//     let param = urlParams.append('param');
//     window.alert('Done!');
// }
// url.replace()

fetch('').then(data => {
    console.log(`${data.data}`);
})


const gebi = id => document.getElementById(id);

gebi("myTarget").insertAdjacentHTML("beforebegin",)

// Fetching 

// const data = { "products" : [...]}
const p = data.products;
const filtered_Prods = p.filter(pr => parseInt(pr.rating)>4) 

filtered_Prods.map(prod => {
    
})

async function getData() {
    const url = "https://dummyjson.com/products";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }