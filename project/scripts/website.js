const menuToggle = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const books = [
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Classic Fiction',
    desc: 'A fellowship of booksellers, readers, and neighbors come together to protect a powerful story and share it with the community.',
    coverImage: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg'
  },
  {
    title: 'Romeo and Juliet',
    author: 'William Shakespeare',
    genre: 'Romance',
    desc: 'A timeless tragedy about young love, family rivalry, and the power of storytelling to bring people together.',
    coverImage: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1629680008i/18135.jpg'
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    desc: 'Practical habits for everyday readers who want to build a better routine and share stronger community energy.',
    coverImage: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    desc: 'A young shepherd pursues a shared dream and discovers how good stories move communities closer together.',
    coverImage: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian Fiction',
    desc: 'A powerful cautionary tale about truth, surveillance, and the value of conversation in a free society.',
    coverImage: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg'
  }
];

const scheduleItems = [
  {
    title: 'Breeze Street Book Drop',
    when: 'Every first Saturday 10:00 a.m. to 1:00 p.m.',
    tag: 'Saturday Swap',
    details: 'Bring up to three books and choose a fresh read from the community table.'
  },
  {
    title: 'Sunset Story Circle',
    when: 'Every third Wednesday 6:30 p.m. to 8:00 p.m.',
    tag: 'Evening Meetup',
    details: 'Join a short reading circle, swap recommendations, and meet other local readers.'
  },
  {
    title: 'Community Porch Exchange',
    when: 'Monday Friday 2:00 p.m. to 5:00 p.m.',
    tag: 'Drop-off Window',
    details: 'Offer a book any weekday and leave it at the porch drop-off for neighbors to collect.'
  }
];

const offersKey = 'bookswapOffers';
let bookOffers = [];
let currentFeaturedIndex = 0;

function updateFooterMeta() {
  const date = document.getElementById('lastModified');
  const year = document.getElementById('currentyear');

  if (date) {
    date.textContent = `Last Modification: ${document.lastModified}`;
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

function lazyLoadImages() {
  const lazyImages = document.querySelectorAll('img.lazy-image');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const image = entry.target;
        const dataSrc = image.dataset.src;

        if (dataSrc) {
          image.src = dataSrc;
          image.removeAttribute('data-src');
        }

        obs.unobserve(image);
      });
    }, { rootMargin: '0px 0px 200px 0px' });

    lazyImages.forEach((img) => {
      if (img.dataset.src) {
        observer.observe(img);
      }
    });
  } else {
    lazyImages.forEach((img) => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
  }
}

function showBook(index) {
  const titleEl = document.getElementById('book-title');
  if (!titleEl) return;

  const book = books[index];
  const cover = document.getElementById('book-cover');

  titleEl.textContent = book.title;
  document.getElementById('book-author').textContent = book.author;
  document.getElementById('book-genre').textContent = book.genre;
  document.getElementById('book-desc').textContent = book.desc;

  if (cover) {
    cover.style.backgroundImage = `url('${book.coverImage}')`;
    cover.style.backgroundSize = 'cover';
    cover.style.backgroundPosition = 'center';
  }
}

function nextBook() {
  currentFeaturedIndex = (currentFeaturedIndex + 1) % books.length;
  showBook(currentFeaturedIndex);
}

function renderBookList(filterText = '') {
  const bookGrid = document.querySelector('.book-grid');
  if (!bookGrid) return;

  const normalized = filterText.trim().toLowerCase();
  const filteredBooks = normalized
    ? books.filter((book) => {
        const searchable = `${book.title} ${book.author} ${book.genre}`.toLowerCase();
        return searchable.includes(normalized);
      })
    : books;

  bookGrid.innerHTML = filteredBooks.length
    ? filteredBooks
        .map(
          (book) => `
        <article class="book-card">
          <div class="card-cover" style="background-image: url('${book.coverImage}');"></div>
          <div class="card-content">
            <span class="book-tag">${book.genre}</span>
            <h3>${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <p>${book.desc}</p>
          </div>
        </article>
      `
        )
        .join('')
    : '<p class="empty-state">No books match your search query. Try another keyword.</p>';
}

function renderSchedule() {
  const scheduleGrid = document.querySelector('.schedule-grid');
  if (!scheduleGrid) return;

  scheduleGrid.innerHTML = scheduleItems
    .map(
      (item) => `
      <article class="schedule-card">
        <p class="card-tag">${item.tag}</p>
        <h3>${item.title}</h3>
        <p class="schedule-time">${item.when}</p>
        <p>${item.details}</p>
      </article>
    `
    )
    .join('');
}

function renderOffers() {
  const offerContainer = document.getElementById('saved-offers');
  const offerCount = document.getElementById('offer-count');

  if (!offerContainer || !offerCount) return;

  offerCount.textContent = bookOffers.length;
  offerContainer.innerHTML = bookOffers.length
    ? bookOffers
        .map(
          (offer) => `
          <article class="offer-card">
            <h3>${offer.title}</h3>
            <p class="book-author">${offer.author}</p>
            <p><strong>Genre:</strong> ${offer.genre}</p>
            <p>${offer.notes || 'No additional notes provided.'}</p>
            <p class="offer-contact">${offer.contact || 'Contact details not provided.'}</p>
          </article>
        `
        )
        .join('')
    : '<p class="empty-state">No saved offers yet. Add a book to share with the community.</p>';
}

function getStoredOffers() {
  const storedValue = localStorage.getItem(offersKey);
  try {
    return storedValue ? JSON.parse(storedValue) : [];
  } catch (error) {
    return [];
  }
}

function persistOffers() {
  localStorage.setItem(offersKey, JSON.stringify(bookOffers));
}

function saveOffer(event) {
  if (event) {
    event.preventDefault();
  }

  const titleField = document.getElementById('title');
  const authorField = document.getElementById('author');
  const genreField = document.getElementById('genre');
  const notesField = document.getElementById('notes');
  const contactField = document.getElementById('contact');

  if (!titleField || !authorField || !genreField) return;

  const title = titleField.value.trim();
  const author = authorField.value.trim();
  const genre = genreField.value;

  if (!title || !author || !genre) {
    return;
  }

  const offer = {
    id: Date.now(),
    title,
    author,
    genre,
    notes: notesField?.value.trim() || '',
    contact: contactField?.value.trim() || ''
  };

  bookOffers.push(offer);
  persistOffers();
  renderOffers();

  titleField.value = '';
  authorField.value = '';
  genreField.value = '';
  if (notesField) notesField.value = '';
  if (contactField) contactField.value = '';
}

function clearOffers() {
  if (!bookOffers.length) return;

  const confirmed = window.confirm('Clear all saved offers from local storage?');
  if (!confirmed) return;

  bookOffers = [];
  persistOffers();
  renderOffers();
}

function addPageListeners() {
  const searchInput = document.getElementById('search-books');
  const offerForm = document.getElementById('offer-form');
  const clearButton = document.getElementById('clear-offers');
  const nextBookButton = document.querySelector('.btn-next');

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      renderBookList(event.target.value);
    });
  }

  if (offerForm) {
    offerForm.addEventListener('submit', saveOffer);
  }

  if (clearButton) {
    clearButton.addEventListener('click', clearOffers);
  }

  if (nextBookButton && document.getElementById('book-title')) {
    nextBookButton.addEventListener('click', nextBook);
  }
}

function initializePage() {
  updateFooterMeta();
  lazyLoadImages();
  renderBookList();
  renderSchedule();
  bookOffers = getStoredOffers();
  renderOffers();
  showBook(currentFeaturedIndex);
  addPageListeners();
}

document.addEventListener('DOMContentLoaded', initializePage);
