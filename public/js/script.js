$(() => {
  // Enable Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Hide/Show search bar
  if (document.querySelectorAll('h1.restaurant-show-title').length > 0) {
    document.querySelector('.search-bar').remove();
  }
});
