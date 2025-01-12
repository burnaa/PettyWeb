const event = new Event("build");

const element = document.createElement("div");
element.addEventListener ("animalfound" , (e)) => {

}


class NumProduct extends HTMLElement {
    constructor (){
        super();
        this.#render();
        this.attachInternals;
    }
    get rating (){
        
    }
    set productName(value){
        this.productName = value;
    }
    #render () {
        this.shadowRoot.appendChild
        this.innerHTML= `<p>Test</p>`
    }
}
// const aevent = new CustomEvent("build", {detail}) 




class NumCart extends HTMLElement {
    constructor() {
        super();
        this.cart = new Map();
        this.#render();
    }
    #render () {
        let htmlstring = ``;
        this.cart.forEach((val,key)=> {htmlstring+=`<h3>${key}</h3><p>${}`})

        return htmlstring;
    }
}