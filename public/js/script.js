$(() => {
  // Enable Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Hide/Show search bar
  if (document.querySelectorAll('h1.restaurant-show-title').length > 0) {
    document.querySelector('.search-bar').remove();
  }

  // SORTING Dropdown box handling
  if (document.querySelectorAll('.sort .dropdown-menu .dropdown-item').length > 0) {
    document.querySelectorAll('.sort .dropdown-menu .dropdown-item').forEach((item) => {
      const searchParams = new URLSearchParams(window.location.search);

      // Set selected sorting option
      if (item.dataset.href === searchParams.get('sort')) {
        item.classList.add('active');
      }

      // Hook click event for page reload
      item.addEventListener('click', (event) => {
        searchParams.set('sort', item.dataset.href);
        window.location.search = searchParams.toString();
      });
    });
  }
});
