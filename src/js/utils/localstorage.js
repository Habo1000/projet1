export { setLocalStorage, getLocalStorage, findInLocalStorage };

function setLocalStorage(idUrls) {
  localStorage.setItem("bookmarks", JSON.stringify(idUrls));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("bookmarks"));
}

function findInLocalStorage(id) {
  const bookmarks = getLocalStorage("bookmarks");
  if (bookmarks) {
    const res = bookmarks.find((item) => {
      return item.id === id;
    });
    console.log(res);
    return res;
  }
}
