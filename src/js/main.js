import "../style.css";
import {
  handleSearch,
  randSrch,
  queryInput,
  onRandSrch,
  setNumPerPage,
} from "./handlers/handle.js";
import { filterBookmarks } from "./displayers/display.js";

//const SECRET_KEY_API = "Hs3FIR6rSZh_i7U4yr_RvGW1kiJcrvkQiRYwTErEBKY";

const sendBtn = document.querySelector("#searchBtn");
const randBtn = document.querySelector("#randBtn");

const perPage = document.querySelector("#perPage");
const bookmarkFilterBtn = document.querySelector("#bookmarkBtn");

sendBtn.addEventListener("click", async () => handleSearch());
queryInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});
randBtn.addEventListener("click", async () => randSrch());

perPage.addEventListener("change", (e) => {
  setNumPerPage(e.target.value);
  if (onRandSrch) {
    randSrch();
  } else {
    handleSearch();
  }
});

bookmarkFilterBtn.addEventListener("click", filterBookmarks);
