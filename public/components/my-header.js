import "../components/my-cart.js";
import "../components/my-login.js";
class MyHeader extends HTMLElement {

    constructor() {
      super();
      this.#render();
    }
    #render(){
        this.innerHTML = `
        <header>
        <!-- Header section // Толгой хэсэг лого, хайлт , хэрэглэгч , сагс -->
        <img id="logo" src="../images/clean_white_logo.png" alt="Компаний лого" width="80" onclick="window.location.href='index.html'">
        <input type="search" name="search" id="haih" placeholder="Бүтээгдэхүүн хайх ">
        <aside>
            <my-login></my-login>
            <my-cart id="my-cart"></my-cart>
        </aside>
    </header>
    <nav>
        <ul>
            <li><a href="../htmls/index.html">Нүүр</a></li>
            <li><a href="../htmls/products.html">Бүтээгдэхүүн</a></li>
            <li><a href="../htmls/turshilt.html">Үрчилгээ</a></li>
            <li><a href="../htmls/information.html">Мэдээлэл</a></li>
        </ul>
    </nav>
        `
    }
  }
  
  customElements.define("my-header", MyHeader);