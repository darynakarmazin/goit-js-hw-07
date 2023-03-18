import { galleryItems } from "./gallery-items.js";
// Change code below this line

//  console.log(galleryItems);

// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.

const galleryList = document.querySelector(".gallery");
const galleryListItems = createGaleryItem(galleryItems);

galleryList.insertAdjacentHTML("beforeend", galleryListItems);

function createGaleryItem(galleryItems) {
  const galleryItem = galleryItems
    .map(({ preview, original, description }) => {
      return `
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
        `;
    })
    .join("");

  return galleryItem;
}

// Реалізація делегування на ul.gallery і отримання url великого зображення.

galleryList.addEventListener("click", onGaleryItemClick);

function onGaleryItemClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;
  const originalImg = event.target.dataset.source;

  const instance = basicLightbox.create(
    `
		<img width="1400" height="900" src="${originalImg}">
	`,
    {
      onShow: (instance) => {
        addEventListener("keydown", closeModal);
      },
      onClose: (instance) => {
        removeEventListener("keydown", closeModal);
      },
    }
  );
  instance.show();

  function closeModal(event) {
    if (event.key === "Escape") {
      instance.close();
      console.log("close modal");
    }
  }
}
