// ------------- Hamburger button for small CSS ----------//

const hambutton = document.querySelector('.hamburger_menu');
const mainnav = document.querySelector('.navigation')

hambutton.addEventListener('click', () => {mainnav.classList.toggle('responsive')}, false);

// To solve the mid resizing issue with responsive class on
window.onresize = () => {if (window.innerWidth > 760) mainnav.classList.remove('responsive')};

//Creates date object updated daily
const yearoptions = {year: "numeric", month: "long", day: "2-digit"}
document.getElementById("currentyear").textContent = new Date().toLocaleDateString("en-US", yearoptions);




// ------------- Lazy Loading of Images ----------//

const imagesToLoad = document.querySelectorAll('img[data-src]');

const imgOptions = {
  threshold: 0,
  rootMargin: "0px 0px 50px 0px"
};

// Remove placeholder image upon loading the image
const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};

// Loop through each image and lazy load it
imagesToLoad.forEach((img) => {
    loadImages(img);
  });

// Allows for items to loaded only when visible in the viewport
  if('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
      // Loop when there is multiple items, aka a src and an data-src
      items.forEach((item) => {
        if(item.isIntersecting) {
          // Load images when the items interact with observer aka come into the viewport
          loadImages(item.target);
          observer.unobserve(item.target);
        }
      });
    }, imgOptions);
    imagesToLoad.forEach((img) => {
      observer.observe(img);
    });
  } else {
    imagesToLoad.forEach((img) => {
      loadImages(img);
    });
  }



// ------------- Parse through JSON file, display Preston, Fish Haven, and Soda Springs Info on Homepage ----------//

const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const towns = jsonObject['towns'];
    for (let i = 0; i < towns.length; i++ ) {
      // removes unnecessary towns from the loop
      if (towns[i]== towns[1])
        continue;
      if (towns[i] == towns[3])
        continue;
      if (towns[i] == towns[4])
        continue;
      if (towns[i] == towns[5])
        continue;
        let caption = document.createElement('section');
        let h2 = document.createElement('h2');
        let h3 = document.createElement('h3')
        let yearFounded = document.createElement('p');
        let population = document.createElement('p');
        let annualRain = document.createElement('p');
        let image = document.createElement('img')

        h2.textContent = towns[i].name;
        h3.textContent = towns[i].motto;
        yearFounded.textContent = 'Year Founded: ' + towns[i].yearFounded
        population.textContent = 'Population: ' + towns[i].currentPopulation
        annualRain.textContent = 'Annual Rain Fall: ' + towns[i].averageRainfall

        caption.appendChild(h2);
        caption.appendChild(h3);
        caption.appendChild(yearFounded)
        caption.appendChild(population)
        caption.appendChild(annualRain)

        if (towns[i] == towns[0]){
          image.setAttribute('src', 'images/field_rows_large.jpg');
          image.setAttribute('alt', 'Town of ' + h2.textContent)
          caption.appendChild(image)
        }
        if (towns[i] == towns[2]) {
          image.setAttribute('src', 'images/barn_at_sunset_large.jpg');
          image.setAttribute('alt', 'Town of ' + h2.textContent)
          caption.appendChild(image)
        }
        if (towns[i] == towns[6]) {
          image.setAttribute('src', 'images/tree_by_field_large.jpg');
          image.setAttribute('alt', 'Town of ' + h2.textContent)
          caption.appendChild(image)
        }

        document.querySelector('div.town_cards').appendChild(caption);
    }
});