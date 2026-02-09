import {
  setSupabaseStorage,
  getSupabaseStorage,
  findInSupabaseStorage,
} from "./utils/supabase/index.js";
const gallery = document.querySelector("#gallery");
const loader = document.querySelector("#loader");
const trashButton = document.querySelector("#trashButton");

let tabIdUrl = (await getSupabaseStorage()) || [];
console.log("tabIdURL:", tabIdUrl);

async function displayGallery(results, onFavorites = false) {
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

    results.forEach(async (element) => {
      let photoCard = document.createElement("div");
      photoCard.className = "photo-card";

      let image = document.createElement("img");
      // console.log(element);
      const imageUrl = onFavorites ? element.url : element.urls.small;
      const imageAlt = onFavorites
        ? element.description
        : element.alt_description;
      image.src = imageUrl;
      image.id = element.id;
      //image.alt = element.alt_description;

      let bookmarkIcon = document.createElement("i");
      bookmarkIcon.className = "fa-solid fa-bookmark bookmark-icon";

      if (await findInSupabaseStorage(element.id)) {
        photoCard.classList.toggle("bookmarked");
      }

      image.addEventListener("click", async () => {
        // console.log("toggle");

        photoCard.classList.toggle("bookmarked");

        if (photoCard.classList.contains("bookmarked")) {
          console.log("added bookmark");

          tabIdUrl.push({ id: element.id, url: imageUrl, alt: imageAlt });
        } else {
          console.log("removed bookmark, ancien ", tabIdUrl);

          tabIdUrl = tabIdUrl.filter((idUrl) => idUrl.id !== element.id);
          console.log("new bookmark list : ", tabIdUrl);
        }
        await setSupabaseStorage(tabIdUrl);
      });

      photoCard.appendChild(bookmarkIcon);
      photoCard.appendChild(image);
      gallery.appendChild(photoCard);
    });
  }
}

async function filterBookmarks() {
  const getBookMarks = await getSupabaseStorage();
  displayGallery(getBookMarks, true);
}

trashButton.addEventListener("click", filterBookmarks);

export { displayGallery, filterBookmarks };
export const numRes = document.querySelector(".num-res");
export const noRes = document.querySelector(".no-res");
