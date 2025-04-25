document.addEventListener("DOMContentLoaded", function () {
  fetch("./json/gallery.json")
    .then((response) => response.json())
    .then((collections) => {
      const carousel = document.getElementById("carousel");
      const prevBtn = document.getElementById("prevBtn");
      const nextBtn = document.getElementById("nextBtn");

      let currentIndex = 0;

      function updateCarousel() {
        // Clear the carousel content
        carousel.innerHTML = "";

        // Get the current image
        const collection = collections[currentIndex];

        // Create the image container
        const slide = document.createElement("div");
        slide.classList.add("carousel-item");

        // Create the image element
        const img = document.createElement("img");
        img.src = collection.image;
        img.alt = collection.caption;
        img.classList.add("carousel-image");

        // Create the caption
        const caption = document.createElement("div");
        caption.classList.add("carousel-caption");
        const captionText = document.createElement("p");
        captionText.textContent = collection.caption;
        caption.appendChild(captionText);

        // Append image and caption to slide
        slide.appendChild(img);
        slide.appendChild(caption);

        // Add slide to carousel
        carousel.appendChild(slide);
      }

      // Show the first image initially
      updateCarousel();

      // Handle "previous" button click
      prevBtn.addEventListener("click", function () {
        currentIndex =
          currentIndex === 0 ? collections.length - 1 : currentIndex - 1;
        updateCarousel();
      });

      // Handle "next" button click
      nextBtn.addEventListener("click", function () {
        currentIndex =
          currentIndex === collections.length - 1 ? 0 : currentIndex + 1;
        updateCarousel();
      });
    })
    .catch((error) => {
      console.error("Error loading collections:", error);
      alert("Sorry, there was an error loading the collections.");
    });
});
