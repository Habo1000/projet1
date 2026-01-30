export { handleSearch, randSrch };
export const queryInput = document.querySelector("#searchInput");
import { displayGallery, numRes } from "../displayers/display";

const ACCESS_KEY_API = "NtDrTB1330s8JArzBKQG462TMuWN74hcnPUxWh0FIFc";
const URL_UNSPLASH = "https://api.unsplash.com";

let results;
let numPerPage = 10;
export function setNumPerPage(num) {
  numPerPage = num;
}
export let onRandSrch = false;

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
