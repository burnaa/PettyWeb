class MyFooter extends HTMLElement {
  
    constructor() {
      super();
      this.#render();
    }
    #render(){
        this.innerHTML = `
        <footer>
        <img src="../images/clean_white_logo.png" alt="logo" width="55">

        <!-- Website structure -->
        <aside>
            <p>Сайтын бүтэц</p>
            <ul>
                <li><a href="../htmls/index.html">Нүүр</a></li>
                <li><a href="../htmls/products.html">Бүтээгдэхүүн</a></li>
                <li><a href="../htmls/turshilt.html">Үрчилгээ</a></li>
                <li><a href="../htmls/information.html">Мэдээлэл</a></li>
            </ul>
        </aside>
        <!-- Social media,contact us -->

        <address>
            <p>Холбоо барих</p>
            <ul>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-phone">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 
                        2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 
                        2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <a href="tel:">+976 89899090</a>
                </li>
                <li><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-mail">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <a href="mailto:">b.....@gmail.com</a>
                </li>
                <li><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-facebook">
                        <path d="M18 2h-3a5 5 
                    0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <a href="http://fb.com">b.....</a>
                </li>
            </ul>
        </address>
    </footer>
    <p class="end">@Зохиогчийн эрх</p>
        `
    }
  }
  
  customElements.define("my-footer", MyFooter);