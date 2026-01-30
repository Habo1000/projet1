export { displayGallery, displayFavorites, filterBookmarks };
export const numRes = document.querySelector(".num-res");
import { setLocalStorage, getLocalStorage } from "../utils/localstorage.js";
import { queryInput } from "../handlers/handle.js";
const gallery = document.querySelector("#gallery");
const loader = document.querySelector("#loader");
const noRes = document.querySelector(".no-res");

let tabIdUrl = [];

function displayGallery(results) {
  console.log(results);

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

      image.src = element.urls.small;
      image.id = element.id;
      image.alt = element.alt_description;

      let bookmarkIcon = document.createElement("i");
      bookmarkIcon.className = "fa-solid fa-bookmark bookmark-icon";
      image.addEventListener("click", () => {
        // console.log("toggle");

        photoCard.classList.toggle("bookmarked");

        if (photoCard.classList.contains("bookmarked")) {
          tabIdUrl.push({ id: element.id, url: element.urls.small });
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

function displayFavorites(res) {
  console.log(res);

  gallery.innerHTML = "";
  if (!res.length) {
    noRes.classList.remove("hidden");
  } else {
    numRes.innerHTML = `${res.length} favoris`;
    res.forEach((element) => {
      let photoCard = document.createElement("div");
      photoCard.className = "photo-card bookmarked";
      let image = document.createElement("img");
      image.src = element.url;
      image.id = element.id;
      // image.alt = element.alt_description;
      let bookmarkIcon = document.createElement("i");
      bookmarkIcon.className = "fa-solid fa-bookmark bookmark-icon";

      photoCard.appendChild(bookmarkIcon);
      photoCard.appendChild(image);
      gallery.appendChild(photoCard);
    });
  }
}

function filterBookmarks() {
  const getBookMarks = getLocalStorage("bookmarks");
  displayFavorites(getBookMarks);
}
