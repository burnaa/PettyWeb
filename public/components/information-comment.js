class InformationComment extends HTMLElement {
    constructor() {
        super();
        this.liked = false;
    }

    connectedCallback() {
        this.body = this.getAttribute("body") || "Xoosn";
        this.likesAmount = this.getAttribute("likes") || 0;
        this.year = this.getAttribute("year") || 1997;
        this.#render();
        
    }
    #render(){
        this.innerHTML =
        `<article class="comment ${this.liked ? 'liked' : ''}">
                <h4 class="comment-body">${this.body}</h4>
                <p class="comment-date">${this.year}</p>
                <num-likes class="num-likes" likes="${this.likesAmount}"></num-likes>
            </article>`;
    }
    Liked(liked){
        this.liked = liked;
        this.#render();
    }
    disconnectedCallback() {

    }

    attributeChangedCallback(name, oldVal, newVal) {

    }

    adoptedCallback() {

    }

}

window.customElements.define('information-comment', InformationComment);