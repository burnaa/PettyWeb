//import { initImageUpload } from './ImageAdmin.js';

imageUpload.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            largeImage.src = e.target.result;
            largeImage.style.display = "block";
            largeImageContainer.querySelector("p").style.display = "none";
        };
        reader.readAsDataURL(file);
    }
});

largeImageContainer.addEventListener("click", function () {
    imageUpload.click();
});

document.addEventListener('DOMContentLoaded', () => {
    // Submit товч дээр дарахад формын өгөгдлийг цуглуулах
    const submitButton = document.getElementById('pay-button');
    submitButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Хуудас дахин ачааллагдахаас сэргийлэх

        const form = document.querySelector(".look"); // Формыг сонгох
        const colors = Array.from(form.querySelectorAll("input[name='color']:checked")).map((el) => el.value);

        const productData = {
            name: form.querySelector("#name").value.trim(),
            code: form.querySelector("#code").value.trim(),
            type: form.querySelector("#type").value,
            animal: form.querySelector("#animal").value,
            origin: form.querySelector("#origin").value,
            certification: form.querySelector("#confirm").checked ? "Yes" : "No",
            price: parseFloat(form.querySelector("#price").value) || 0,
            piece: parseInt(form.querySelector("#piece").value, 10) || 0,
            start_date: form.querySelector("#start_date").value || null,
            end_date: form.querySelector("#end_date").value || null,
            size: form.querySelector("input[name='size']:checked")?.value || '',
            colors: colors.join(","),
            images: form.querySelector("#imageUpload").value || null,
        };
        console.log(productData);

        try {
            const response = await fetch('/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
        
            if (!response.ok) {
                const error = await response.json();
                const message = error.message || "Тодорхойгүй алдаа гарлаа.";
                alert(`Алдаа: ${message}`);
                return;  // Алдаа гарсан бол үргэлжлүүлэхгүй
            }
        
            const result = await response.json();
            alert('Бүтээгдэхүүн амжилттай нэмэгдлээ!');
            console.log('Product added successfully:', result);
        } catch (err) {
            alert('Сервертэй холбогдох үед алдаа гарлаа. Та сүлжээгээ шалгана уу.');
            console.error('Error submitting product:', err);
        }
        
    });
});
