document.addEventListener("DOMContentLoaded", function () {
  fetch("./json/gallery.json")
    .then((response) => response.json())
    .then((images) => {
      const gallery = document.getElementById("gallery");
      const modal = document.getElementById("imageModal");
      const modalImage = document.getElementById("modalImage");
      const imageCaption = document.getElementById("imageCaption");
      const closeModal = document.getElementById("closeModal");

      if (images.length === 0) {
        gallery.innerHTML =
          "<p class='no-images-message'>No images available at the moment.</p>";
        return;
      }

      images.forEach((image) => {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        const imageBox = document.createElement("div");
        imageBox.classList.add("image-box");

        const imgElement = document.createElement("img");
        imgElement.src = image.thumbnail;
        imgElement.alt = image.caption;
        imgElement.classList.add("image-preview");

        const captionBox = document.createElement("div");
        captionBox.classList.add("caption-box");

        const title = document.createElement("h3");
        title.classList.add("caption-title");
        title.textContent = image.caption;

        const viewBtn = document.createElement("button");
        viewBtn.classList.add("view-btn");
        viewBtn.textContent = "View Full Image";

        viewBtn.addEventListener("click", function () {
          modalImage.src = image.image;
          imageCaption.textContent = image.caption;
          modal.classList.add("show");
        });

        captionBox.appendChild(title);
        captionBox.appendChild(viewBtn);
        imageBox.appendChild(imgElement);
        imageBox.appendChild(captionBox);
        galleryItem.appendChild(imageBox);
        gallery.appendChild(galleryItem);
      });

      // Close modal functionality
      closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
        modalImage.src = "";
        imageCaption.textContent = "";
      });

      // Close modal when clicking outside modal-content
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
          modalImage.src = "";
          imageCaption.textContent = "";
        }
      });
    })
    .catch((error) => {
      console.error("Error loading gallery:", error);
      const gallery = document.getElementById("gallery");
      gallery.innerHTML =
        "<p class='error-message'>Sorry, there was an error loading the gallery.</p>";
    });
});
