import {
  setLocalStorage,
  getLocalStorage,
  findInLocalStorage,
} from "../utils/localstorage.js";
const gallery = document.querySelector("#gallery");
const loader = document.querySelector("#loader");
const trashButton = document.querySelector("#trashButton");

let tabIdUrl = [];

function displayGallery(results, onFavorites = false) {
  console.log(results);

  if (onFavorites) {
    trashButton.classList.remove("hidden");
  } else {
    trashButton.classList.add("hidden");
  }
  loader.classList.add("hidden");
  gallery.innerHTML = "";
  // queryInput.value = "";

  if (!results.length) {
    noRes.classList.remove("hidden");
  } else {
    numRes.innerHTML = `${results.length} résultats apparus`;
    noRes.classList.add("hidden");

    results.forEach((element) => {
      let photoCard = document.createElement("div");
      photoCard.className = "photo-card";

      let image = document.createElement("img");
      // console.log(element);
      const imageUrl = onFavorites ? element.url : element.urls.small;
      image.src = imageUrl;
      image.id = element.id;
      //image.alt = element.alt_description;

      let bookmarkIcon = document.createElement("i");
      bookmarkIcon.className = "fa-solid fa-bookmark bookmark-icon";

      if (findInLocalStorage(element.id)) {
        console.log("hello");

        photoCard.classList.toggle("bookmarked");
      }

      image.addEventListener("click", () => {
        // console.log("toggle");

        photoCard.classList.toggle("bookmarked");

        if (photoCard.classList.contains("bookmarked")) {
          tabIdUrl.push({ id: element.id, url: imageUrl });
        } else {
          tabIdUrl = tabIdUrl.filter((idUrl) => idUrl.id !== element.id);
        }
        setLocalStorage(tabIdUrl);
      });

      photoCard.appendChild(bookmarkIcon);
      photoCard.appendChild(image);
      gallery.appendChild(photoCard);
    });
  }
}

function filterBookmarks() {
  const getBookMarks = getLocalStorage("bookmarks");
  displayGallery(getBookMarks, true);
}

trashButton.addEventListener("click", () => {
  filterBookmarks();
});

export { displayGallery, filterBookmarks };
export const numRes = document.querySelector(".num-res");
export const noRes = document.querySelector(".no-res");
