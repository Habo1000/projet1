export { setLocalStorage, getLocalStorage };

function setLocalStorage(idUrls) {
  localStorage.setItem("bookmarks", JSON.stringify(idUrls));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("bookmarks"));
}
