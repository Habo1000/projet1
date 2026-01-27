const ACCESS_KEY_API = "NtDrTB1330s8JArzBKQG462TMuWN74hcnPUxWh0FIFc";
const SECRET_KEY_API = "Hs3FIR6rSZh_i7U4yr_RvGW1kiJcrvkQiRYwTErEBKY";
const URL_UNSPLASH = "https://api.unsplash.com";

const queryInput = document.querySelector("#searchInput");
const sendBtn = document.querySelector("#searchBtn");
const randBtn = document.querySelector("#randBtn");

const gallery = document.querySelector("#gallery");
const loader = document.querySelector("#loader");
const numRes = document.querySelector(".num-res");
const noRes = document.querySelector(".no-res");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const perPage = document.querySelector("#perPage");
const bookmarkFilterBtn = document.querySelector("#bookmarkBtn");

let results;
let numPerPage = 10;
let onRandSrch = false;
let tabIdUrl = [];

async function handleSearch() {
  try {
    const query = queryInput.value.trim();
    if (!query) {
      alert("Valeur vide");
      loader.classList.add("hidden");
      return null;
    }
    numRes.innerHTML = "";
    const response = await axios.get(URL_UNSPLASH + "/search/photos", {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY_API}`,
      },
      params: {
        query,
        per_page: numPerPage,
      },
    });
    console.log(response);
    results = response.data.results;
    onRandSrch = false;
    displayGallery(results);
  } catch (error) {
    console.log("erreur");
    console.error(error);
  }
  //  finally {
  //   loader.classList.remove("hidden");
  // } il ne faut pas le finally ici car on veut enlever le loader une fois les résultats affichés
}
sendBtn.addEventListener("click", async () => handleSearch());
queryInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

async function randSrch() {
  try {
    const query = queryInput.value.trim();
    let response;

    if (!query) {
      response = await axios.get(URL_UNSPLASH + "/photos/random", {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY_API}`,
        },
        params: {
          count: numPerPage,
        },
      });
    } else {
      response = await axios.get(URL_UNSPLASH + "/photos/random", {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY_API}`,
        },
        params: {
          query,
          count: numPerPage,
        },
      });
    }
    console.log(response);
    results = response.data;
    onRandSrch = true;
    displayGallery(results);
  } catch (err) {
    console.log(err.response);
    if (err.response && err.response.status === 404) {
      alert(
        "Aucune photo trouvée pour cette recherche. Essayez un autre terme.",
      );
    }
  }
}

randBtn.addEventListener("click", async () => randSrch());

function displayGallery(results) {
  console.log(results);

  loader.classList.add("hidden");
  gallery.innerHTML = "";
  queryInput.value = "";

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

perPage.addEventListener("change", (e) => {
  numPerPage = e.target.value;
  if (onRandSrch) {
    randSrch();
  } else {
    handleSearch();
  }
});

function filterBookmarks() {
  const getBookMarks = getLocalStorage("bookmarks");
  displayFavorites(getBookMarks);
}

function setLocalStorage(idUrls) {
  console.log("setlocal");
  localStorage.setItem("bookmarks", JSON.stringify(idUrls));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("bookmarks"));
}

bookmarkFilterBtn.addEventListener("click", filterBookmarks);
