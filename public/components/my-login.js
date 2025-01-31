class MyLogin extends HTMLElement {
    constructor() {
        super();
        this.dialog = null; // Диалог үүсгэх
        this.backdrop = null; // Бүдэглэх давхарга
        this.theme = 'light'; // Эхний theme-г light болгоно
    }

    render() {
        this.innerHTML = `
            <button class="loginButton" aria-label="хэрэглэгч хэсэг">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-user">
                    <title>Хэрэглэгчийн дүрс</title>
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            </button>
        `;
    }

    connectedCallback() {
        this.render();
        const button = this.querySelector(".loginButton");

        // Товчин дээр дарж диалогийг харуулах
        button.addEventListener("click", () => this.showLogin());
    }

    showLogin() {
        // Backdrop үүсгэх
        if (!this.backdrop) {
            this.backdrop = document.createElement("div");
            this.backdrop.classList.add("backdrop");
            document.body.appendChild(this.backdrop);
        }

        // Dialog үүсгэх
        if (!this.dialog) {
            this.dialog = document.createElement("div");
            this.dialog.classList.add("loginDialog");

            this.dialog.innerHTML = `
                <aside>
                    <div class="login-header">
                        Тавтай морил
                        
                        <img src="../images/logo.png" alt="logo" id="logo"
                            style="width: 3rem; height: 3.2rem; margin-left: 15rem; cursor: pointer;">

                        <div class="theme-toggle">
                            <label>
                                <input type="checkbox" id="theme-toggle" />
                            </label>
                        </div>
                    </div>
                    <p>Шинэ, шилдэг бүхнийг хамгийн түрүүнд...</p>
                    <form class="modal-body">
                        <input type="number" id="phone-number" placeholder="Утасны дугаар оруулна уу" pattern="^[0-9]*$" required>
                        <input type="password" id="password" placeholder="Нууц үгээ оруулна уу">
                        <a href="#">Нууц үгээ мартсан уу?</a>
                        <br>
                        <button type="button" class="checkout">
                            <a href="../htmls/user.html"> Нэвтрэх</a>
                        </button>
                    </form>
                </aside>
            `;

            document.body.appendChild(this.dialog);

            // **Dark/Light mode toggle хэрэгжүүлэх**
            const themeToggle = this.dialog.querySelector("#theme-toggle");
            themeToggle.addEventListener("change", (e) => {
                this.theme = e.target.checked ? 'dark' : 'light';
                this.updateTheme();
            });
        }

        // Backdrop болон диалогыг харуулах
        this.backdrop.style.display = "block";
        this.dialog.style.display = "block";

        // Backdrop дээр дарж хаах
        window.addEventListener("click", (event) => {
            if (event.target === this.backdrop) {
                this.closeDialog();
            }
        });

        // Эхний theme-г тохируулах
        this.updateTheme();
    }

    updateTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
    
        if (this.dialog) {
            this.dialog.style.backgroundColor = `var(--bg-color)`;
            this.dialog.style.color = `var(--text-color)`;
        }
    }
    

    closeDialog() {
        // Backdrop болон диалогыг нуух
        if (this.backdrop) this.backdrop.style.display = "none";
        if (this.dialog) this.dialog.style.display = "none";
    }
}

window.customElements.define("my-login", MyLogin);
