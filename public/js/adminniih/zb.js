import { initImageUpload } from './ImageAdmin.js';

document.addEventListener('DOMContentLoaded', () => {
    const largeImageContainer = document.getElementById('largeImageContainer');
    const largeImage = document.getElementById('largeImage');
    const imageUpload = document.getElementById('imageUpload');
    const smallImageContainer = document.getElementById('smallImageContainer');

    // Зураг оруулах функц эхлүүлэх
    const { getSmallImages } = initImageUpload(largeImageContainer, largeImage, imageUpload, smallImageContainer);

    // Submit товч дээр дарахад формын өгөгдлийг цуглуулах
    const submitButton = document.getElementById('pay-button');
    submitButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Хуудас дахин ачааллагдахаас сэргийлэх

        const form = document.querySelector(".look"); // Формыг сонгох
        const sizes = Array.from(form.querySelectorAll("input[name='size']:checked")).map((el) => el.value);
        const colors = Array.from(form.querySelectorAll("input[name='color']:checked")).map((el) => el.value);
        const images = getSmallImages();

        if (images.length === 0) {
            alert("Зураг оруулах шаардлагатай!");
            return;
        }

        const productData = {
            name: form.querySelector("#name").value.trim(),
            code: form.querySelector("#code").value.trim(),
            type: form.querySelector("#type").value,
            origin: form.querySelector("#origin").value,
            price: parseFloat(form.querySelector("#price").value) || 0,
            piece: parseInt(form.querySelector("#piece").value, 10) || 0,
            start_date: form.querySelector("#start_date").value || null,
            end_date: form.querySelector("#end_date").value || null,
            sizes: sizes.join(","),
            colors: colors.join(","),
            images: images,
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
