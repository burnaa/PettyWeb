document.addEventListener('DOMContentLoaded', async () => {
    let adopts = [];
    const refresh = performance.getEntriesByType('navigation')[0]?.type || '';
    if (refresh === 'reload') {
        // Хэрэв хуудас refresh хийгдсэн бол url-ийг цэвэрлэнэ
        const url = new URL(window.location);
        url.search = ''; // URL-ийн query параметрүүдийг цэвэрлэнэ
        window.history.replaceState(null, '', url); // URL-ийг шинэчилнэ
    }

    // Серверээс өгөгдөл татах
    async function fetchAdoptions() {
        try {
            const response = await fetch('http://localhost:3000/adoptions');
            if (!response.ok) throw new Error('Failed to fetch adoptions');
            const data = await response.json();
            adopts = data;
            render(adopts);
        } catch (error) {
            console.error('Error fetching adoptions:', error);
        }
    }

    // Өгөгдөл харуулах
    function render(data) {
        const container = document.querySelector('.result');
        if (!container) return;

        const html = data.map(item => `
            <article class="zar">
                <img src="${item.image || '../images/default.jpg'}" alt="${item.altText || 'Adopt'}" class="product-image">
                <div class="zar-info">
                    <h3>${item.adopt_name || 'Тодорхойгүй нэр'}</h3>
                    <p>${item.adopt_factory || 'Тодорхойгүй үйлдвэр'} үйлдвэрийн ${item.age || 'Тодорхойгүй нас'} настай ${item.sex || 'Тодорхойгүй хүйс'} ${item.animal_type || 'Тодорхойгүй төрөл'}. ${item.text || 'Мэдээлэл алга'}</p>
                    <a href="tel:${item.phone || 'Холбогдох дугаар байхгүй'}">Холбогдох утас: ${item.phone || 'Холбогдох дугаар байхгүй'}</a>
                </div>
            </article>
        `).join('');

        container.innerHTML = html;
    }

    // Шүүлтүүр хийх
    function filterData() {
        const selectedTypes = Array.from(document.querySelectorAll('input[name="animal"]:checked')).map(cb => cb.value);
        const selectedGender = document.querySelector('input[name="gender"]:checked')?.value || null;
        const selectedAges = Array.from(document.querySelectorAll('input[name="age"]:checked')).map(cb => cb.value);

        const filtered = adopts.filter(adopt => {
            const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(adopt.animal_type);
            const genderMatch = !selectedGender || adopt.sex === selectedGender;
            const ageMatch = selectedAges.length === 0 || selectedAges.some(range => {
                const [min, max] = range.split('-').map(Number);
                return adopt.age >= min && adopt.age <= max;
            });
            return typeMatch && genderMatch && ageMatch;
        });

        render(filtered);
    }

    // URL-ийг шинэчлэх
    function updateURL() {
        const url = new URL(window.location);
        const params = new URLSearchParams();

        document.querySelectorAll('input[name="animal"]:checked').forEach(cb => params.append('animal', cb.value));
        document.querySelectorAll('input[name="age"]:checked').forEach(cb => params.append('age', cb.value));
        const gender = document.querySelector('input[name="gender"]:checked');
        if (gender) params.set('gender', gender.value);

        url.search = params.toString();
        window.history.replaceState(null, '', url);
    }

    // URL-ээс шүүлтүүрийг тохируулах
    function syncFiltersFromURL() {
        const url = new URL(window.location);
        const params = new URLSearchParams(url.search);

        params.getAll('animal').forEach(value => {
            const checkbox = document.querySelector(`input[name="animal"][value="${value}"]`);
            if (checkbox) checkbox.checked = true;
        });

        params.getAll('age').forEach(value => {
            const checkbox = document.querySelector(`input[name="age"][value="${value}"]`);
            if (checkbox) checkbox.checked = true;
        });

        const gender = params.get('gender');
        if (gender) {
            const radio = document.querySelector(`input[name="gender"][value="${gender}"]`);
            if (radio) radio.checked = true;
        }
    }

    // Event listeners
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
        input.addEventListener('change', () => {
            updateURL();
            filterData();
        });
    });

    // Эхлэх
    syncFiltersFromURL();
    await fetchAdoptions();
    filterData();
});