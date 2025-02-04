import "../components/my-cart.js";
import "../components/my-login.js";
import "../components/main-product.js";

class MyHeader extends HTMLElement {
    constructor() {
        super();
        this.#render();
    }

    #render() {
        this.innerHTML = `
        <header>
            <img id="logo" src="../images/clean_white_logo.png" alt="Компаний лого" width="80" onclick="window.location.href='index.html'">
            <div id="search-container">
                <input type="search" name="search" id="haih" placeholder="Бүтээгдэхүүн хайх">
                <div id="search-results"></div>
            </div>
            <aside>
                <my-login></my-login>
                <my-cart></my-cart>
            </aside>
        </header>
        <nav>
            <ul>
                <li><a href="../htmls/index.html">Нүүр</a></li>
                <li><a href="../htmls/products.html">Бүтээгдэхүүн</a></li>
                <li><a href="../htmls/turshilt.html">Үйлчилгээ</a></li>
            </ul>
        </nav>
        <div id="dialog-container"></div> <!-- Диалог харуулах хэсэг -->
        `;
    }

    connectedCallback() {
        const searchInput = this.querySelector('#haih');
        const resultsList = this.querySelector('#search-results');
        const dialogContainer = this.querySelector('#dialog-container');

        searchInput.addEventListener('input', async () => {
            const query = searchInput.value.trim();
            if (query.length < 2) {
                resultsList.innerHTML = '';
                return;
            }

            try {
                const response = await fetch(`/products/search/${encodeURIComponent(query)}`);
                if (!response.ok) throw new Error('Алдаа гарлаа.');
                const products = await response.json();

                resultsList.innerHTML = products.length === 0
                    ? '<li class="no-result">Үр дүн олдсонгүй</li>'
                    : products.map((product, index) => `
                        <li class="search-item" data-index="${index}" data-id="${product.prod_id}" data-name="${product.prod_name}">
                            <img src="${product.subpic}" alt="${product.prod_name}" width="40">
                            <span>${product.prod_name} (${product.prod_code})</span>
                        </li>
                    `).join('');

            } catch (err) {
                console.error(err.message);
            }
        });

        // Сонгосон хайлтын нэрийг input руу хийх
        resultsList.addEventListener('click', (event) => {
            const item = event.target.closest('.search-item');
            if (item) {
                searchInput.value = item.dataset.name;
                resultsList.innerHTML = ''; // Dropdown-г хаах
                detailsDialog(item.dataset.id); // Диалогыг ажиллуулах
            }
        });

        // Хэрэв гадна дарах юм бол dropdown хаагдана
        document.addEventListener('click', (event) => {
            if (!this.contains(event.target)) {
                resultsList.innerHTML = '';
                searchInput.value = '';
            }
        });

        // **Диалог харуулах функц**
        function detailsDialog(id) {
            const dialogHtml = `
                <div class="overlay">
                    <div class="dialog">
                        <button class="close-button">×</button>
                        <main-product product-id="${id}"></main-product>
                    </div>
                </div>
            `;
        
            dialogContainer.innerHTML = dialogHtml;
            dialogContainer.style.display = 'block';
        
            const closeDialog = () => {
                dialogContainer.innerHTML = '';
                dialogContainer.style.display = 'none';
                searchInput.value = ''; // Хайлтын талбарыг хоослох
            };
        
            // Хаах товч дээр event listener нэмэх
            dialogContainer.querySelector('.close-button').addEventListener('click', closeDialog);
        
            // Гадна дарсан үед хаах
            dialogContainer.querySelector('.overlay').addEventListener('click', (e) => {
                if (e.target.classList.contains('overlay')) {
                    closeDialog();
                }
            });
        }
        
    }
}

customElements.define('my-header', MyHeader);
