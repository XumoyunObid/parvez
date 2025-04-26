document.addEventListener("DOMContentLoaded", function () {
  fetch("./json/gallery.json")
    .then((response) => response.json())
    .then((images) => {
      const carouselInner = document.getElementById("carouselInner");
      const carouselIndicators = document.getElementById("carouselIndicators");
      const thumbnails = document.getElementById("thumbnails");

      images.forEach((img, index) => {
        const activeClass = index === 0 ? "active" : "";

        // Add carousel item
        carouselInner.innerHTML += `
          <div class="carousel-item ${activeClass}">
            <img src="${img.image}" class="d-block w-100 rounded-4" alt="${img.caption}">
            <div class="carousel-caption d-none d-md-block">
              <h5>${img.caption}</h5>
            </div>
          </div>
        `;

        // Add carousel indicator
        carouselIndicators.innerHTML += `
          <button
            type="button"
            data-bs-target="#mainCarousel"
            data-bs-slide-to="${index}"
            class="${activeClass}"
            aria-current="${index === 0 ? "true" : "false"}"
            aria-label="Slide ${index + 1}"
          ></button>
        `;

        thumbnails.innerHTML += `
          <img
            src="${img.image}"
            class="img-thumbnail"
            style="width: 100px; height: 70px; object-fit: cover; cursor: pointer;"
            alt="${img.caption}"
            data-bs-target="#mainCarousel"
            data-bs-slide-to="${index}"
          />
        `;
      });
    })
    .catch((error) => console.error("Error loading gallery:", error));
});
