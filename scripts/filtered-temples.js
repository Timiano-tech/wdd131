const date = document.getElementById("lastModified");
date.innerHTML = `Last Modification: ${document.lastModified}`;

const year = document.querySelector("#currentyear");
year.innerHTML = new Date().getFullYear();

// Hamburger Menu

const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("nav");

nav.classList.add("hide");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("hide");

    if (nav.classList.contains("hide")) {
        menuButton.textContent = "☰";
    } else {
        menuButton.textContent = "✖";
    }
});


const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
   {
        templeName: "Belém Brazil Temple",
        location: "Belém Brazil",
        dedicated: "2022, November, 20",
        area: 28675,
        imageUrl: 
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/belem-brazil/1280x800/belem_brazil_temple_exterior2.jpg"
    },
    {
        templeName: "Bountiful Utah Temple",
        location: "Bountiful Utah",
        dedicated: "1995, January, 14",
        area: 104000,
        imageUrl: 
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/bountiful-utah/1280x800/bountiful-temple-766347-wallpaper.jpg"
    },
    {
        templeName: "Brigham City Utah Temple",
        location: "Brigham City Utah", 
        dedicated: "2012, September, 23",
        area: 36000,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/brigham-city-utah/1280x800/brigham-city-temple-lds-1078623-wallpaper.jpg"
    },
    {
        templeName: "Cedar City Utah Temple",
        location: "Cedar City Utah",
        dedicated: "2017, December, 10",
        area: 42657,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/cedar-city-utah/1200x675/Cedar-City-1978603.jpg"
    },
    {
        templeName: "Chicago Illinois Temple",
        location: "Glenview Illinois",
        dedicated: "1985, August, 13",
        area: 37062,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/chicago-illinois/1280x800/Chicago-Temple_0784.jpg"
    }
];

// Create and insert temple cards into the .temple-grid
function displayTemples(list) {
  const grid = document.querySelector('.temple-grid');
  if (!grid) return;

  // clear any existing content
  grid.innerHTML = '';

  list.forEach(item => {
    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.className = 'temple-img';
    img.src = item.imageUrl;
    img.alt = item.templeName;
    img.loading = 'lazy';

    const figcap = document.createElement('figcaption');
    figcap.innerHTML = `
      <strong>${item.templeName}</strong><br>
      <span class="location">${item.location}</span><br>
      <span class="dedicated">Dedicated: ${item.dedicated}</span><br>
      <span class="area">Area: ${item.area.toLocaleString()} sq ft</span>
    `;

    figure.appendChild(img);
    figure.appendChild(figcap);
    grid.appendChild(figure);
  });
}

// populate on load
displayTemples(temples);

// Filter functions
function filterTemples(type) {
  return temples.filter(temple => {

    const year = parseInt(temple.dedicated.split(',')[0]);
    
    switch(type.toLowerCase()) {
      case 'old':
        return year < 1900;
      case 'new':
        return year > 2000;
      case 'large':
        return temple.area > 90000;
      case 'small':
        return temple.area < 10000;
      case 'home':
      default:
        return true;
    }
  });
}

// Add event listeners to nav links using IDs
const homeLink = document.getElementById('home');
const oldLink = document.getElementById('old');
const newLink = document.getElementById('new');
const largeLink = document.getElementById('large');
const smallLink = document.getElementById('small');

[homeLink, oldLink, newLink, largeLink, smallLink].forEach(link => {
  if (link) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filterType = link.id;
      const filtered = filterTemples(filterType);
      displayTemples(filtered);
      
      
      const mainHeading = document.querySelector('.main-header');
      if (mainHeading) {
        mainHeading.textContent = link.textContent;
      }
    });
  }
});