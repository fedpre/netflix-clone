export function footerDate() {
  const dateNode = document.querySelector('.footer-date')
  dateNode.innerHTML = new Date().getFullYear()
}