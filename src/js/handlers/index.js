import { displayGallery, numRes, noRes } from "../displayers/index.js";
import axios from "axios";
// import "dotenv/config";

let results;
let numPerPage = 10;

async function handleSearch() {
  try {
    const query = queryInput.value.trim();
    loader.classList.remove("hidden");
    if (!query) {
      noRes.classList.remove("hidden");
      loader.classList.add("hidden");
      gallery.innerHTML = "";
      return null;
    }
    numRes.classList.add("hidden");
    const response = await axios.get(
      import.meta.env.VITE_UNSPLASH_URL + "/search/photos",
      {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
        },
        params: {
          query,
          per_page: numPerPage,
        },
      },
    );
    console.log(response);
    results = response.data.results;
    onRandSrch = false;
    displayGallery(results);
  } catch (error) {
    console.log("erreur");
    console.error(error.message);
  }
  //  finally {
  //   loader.classList.remove("hidden");
  // } il ne faut pas le finally ici car on veut enlever le loader une fois les résultats affichés
}

async function randSrch() {
  try {
    const query = queryInput.value.trim();
    let response;
    loader.classList.remove("hidden");

    if (!query) {
      response = await axios.get(
        import.meta.env.VITE_UNSPLASH_URL + "/photos/random",
        {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
          },
          params: {
            count: numPerPage,
          },
        },
      );
    } else {
      response = await axios.get(
        import.meta.env.VITE_UNSPLASH_URL + "/photos/random",
        {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
          },
          params: {
            query,
            count: numPerPage,
          },
        },
      );
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

export { handleSearch, randSrch };
export const queryInput = document.querySelector("#searchInput");
export function setNumPerPage(num) {
  numPerPage = num;
}
export let onRandSrch = false;
