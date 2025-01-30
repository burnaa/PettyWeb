import "../components/my-cart.js";
import "../components/my-login.js";
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
                <my-cart id="my-cart"></my-cart>
            </aside>
        </header>
        <nav>
            <ul>
                <li><a href="../htmls/index.html">Нүүр</a></li>
                <li><a href="../htmls/products.html">Бүтээгдэхүүн</a></li>
                <li><a href="../htmls/turshilt.html">Үйлчилгээ</a></li>
            </ul>
        </nav>
        `;
    }

    connectedCallback() {
        const searchInput = this.querySelector('#haih');
        const resultsList = this.querySelector('#search-results');

        let selectedIndex = -1; // Keyboard-оор сонгогдсон index

        searchInput.addEventListener('input', async (event) => {
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
                        <li class="search-item" data-index="${index}" data-name="${product.prod_name}">
                            <img src="${product.subpic}" alt="${product.prod_name}" width="40">
                            <span>${product.prod_name} (${product.prod_code})</span>
                        </li>
                    `).join('');

                selectedIndex = -1; // Keyboard selection reset

            } catch (err) {
                console.error(err.message);
            }
        });

        // Keyboard-оор сонголт хийх
        searchInput.addEventListener('keydown', (event) => {
            const items = resultsList.querySelectorAll('.search-item');

            if (event.key === 'ArrowDown') {
                selectedIndex = (selectedIndex + 1) % items.length;
            } else if (event.key === 'ArrowUp') {
                selectedIndex = (selectedIndex - 1 + items.length) % items.length;
            } else if (event.key === 'Enter' && selectedIndex >= 0) {
                searchInput.value = items[selectedIndex].dataset.name;
                resultsList.innerHTML = ''; // Dropdown-г хаах
            }

            items.forEach((item, index) => {
                item.classList.toggle('selected', index === selectedIndex);
            });
        });

        // Сонгосон хайлтын нэрийг input руу хийх
        resultsList.addEventListener('click', (event) => {
            const item = event.target.closest('.search-item');
            if (item) {
                searchInput.value = item.dataset.name;
                resultsList.innerHTML = ''; // Dropdown-г хаах
            }
        });

        // Хэрэв гадна дарах юм бол dropdown хаагдана
        document.addEventListener('click', (event) => {
            if (!this.contains(event.target)) {
                resultsList.innerHTML = '';
            }
        });
    }
}

customElements.define('my-header', MyHeader);

