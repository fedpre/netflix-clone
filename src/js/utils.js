export function footerDate() {
  const dateNode = document.querySelector('.footer-date')
  dateNode.innerHTML = new Date().getFullYear()
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

