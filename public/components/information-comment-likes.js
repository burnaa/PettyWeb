class CommentLikes extends HTMLElement {
    constructor() {
        super();
        this.liked = false;
        //implementation
    }

    connectedCallback() {
        this.likes = this.getAttribute("likes") || 0; 
        this.#render();
        this.addEventListener("click", e=> {
            if(!this.liked){
                ++this.likes;
                this.liked = !this.liked;
            }
            else{
                --this.likes;
                this.liked = !this.liked;
            }
            this.#render();
            document.getElementById
        })
    }
    #render(){
        this.innerHTML = `<button>👍<span>${this.likes}</span></button>`;
    }
    disconnectedCallback() {
        //implementation
    }

    attributeChangedCallback(name, oldVal, newVal) {
        //implementation
    }

    adoptedCallback() {
        //implementation
    }

}

window.customElements.define('information-comment-likes', CommentLikes);