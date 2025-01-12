export function initImageUpload(largeImageContainer, largeImage, imageUpload, smallImageContainer) {
    const MAX_SMALL_IMAGES = 4;
    let smallImageCount = 0;
    let smallImages = []; // Жижиг зургуудыг хадгалах массив

    imageUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                largeImage.src = e.target.result;
                largeImage.style.display = "block";
                largeImageContainer.querySelector("p").style.display = "none";

                if (smallImageCount < MAX_SMALL_IMAGES) {
                    addSmallImage(smallImageContainer, e.target.result);
                    smallImages.push(e.target.result);
                    smallImageCount++;
                }
            };
            reader.readAsDataURL(file);
        }
    });

    largeImageContainer.addEventListener("click", function () {
        imageUpload.click();
    });

    function addSmallImage(container, src) {
        const smallImageWrapper = document.createElement("div");
        smallImageWrapper.classList.add("small-image-container");

        const smallImage = document.createElement("img");
        smallImage.src = src;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "×";
        removeBtn.classList.add("remove-btn");

        removeBtn.addEventListener("click", function () {
            const index = smallImages.indexOf(src);
            if (index > -1) smallImages.splice(index, 1);
            smallImageWrapper.remove();
            smallImageCount--;
        });

        smallImageWrapper.appendChild(smallImage);
        smallImageWrapper.appendChild(removeBtn);
        container.appendChild(smallImageWrapper);
    }

    return {
        getSmallImages: () => smallImages,
    };
}
