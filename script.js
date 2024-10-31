const museums = document.querySelectorAll('.museum');

museums.forEach((museum) => {
  const showMoreButton = museum.querySelector('.show-more');
  const moreInfoDiv = museum.querySelector('.more-info');

  showMoreButton.addEventListener('click', () => {
    museum.classList.toggle('show-more-info');
  });
});
