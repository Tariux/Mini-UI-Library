function changeUrl(newUrl) {
  window.history.pushState({ path: newUrl }, '', newUrl);
}
function preventLinksEvent() {
  document.addEventListener('click', function (event) {
    const targetElement = event.target;

    if (targetElement.tagName === 'A') {
      event.preventDefault();
      changeUrl(targetElement.href);
    }
  });
}
preventLinksEvent();
