// ------------- Banner for free pancakes on Friday ----------//
let date = new Date();
let weekday = date.toLocaleDateString("default", { weekday: 'long' });

let message1 = "";

if (weekday == "Friday") {
    message1 = "Saturday = Preston Pancakes in the Park! 9:00 a.m. Saturday at the city park.";
    document.querySelector("#pancakes").textContent = message1
} else {
  let pancakes = document.querySelector("#pancakes");
  pancakes.remove()
}



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



// ------------- Change range slider on the form ----------//

// When the rating input is changed by the user, update the range in the HTML
function adjustRating(rating) {
  document.getElementById("rate").innerHTML = rating;
}

// Allow for the first option of select to show, but not be selectable by user
function selectResponse() {
  const s = document.querySelector('#selected');
  const sel = document.querySelector('#select_subject');
  s.style.display = "block";
  s.textContent = sel.value;
}

// ------------- Parse through JSON file, display Preston, Fish Haven, and Soda Springs Data ----------//

const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    // console.table(jsonObject);  // temporary checking for valid response and data parsing
    const towns = jsonObject['towns'];
    for (let i = 0; i < towns.length; i++ ) {
      // removes unnecessary towns from the loop
      if (towns[i]== towns[0])
        continue;
      if (towns[i] == towns[2])
        continue;
      if (towns[i] == towns[3])
        continue;
      if (towns[i] == towns[4])
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

        if (towns[i] == towns[1]){
          image.setAttribute('src', '../../lesson9/images/field_rows_large.jpg');
          image.setAttribute('alt', 'Town of ' + h2.textContent)
          caption.appendChild(image)
        }
        if (towns[i] == towns[5]) {
          image.setAttribute('src', '../../lesson9/images/barn_at_sunset_large.jpg');
          image.setAttribute('alt', 'Town of ' + h2.textContent)
          caption.appendChild(image)
        }
        if (towns[i] == towns[6]) {
          image.setAttribute('src', '../../lesson9/images/tree_by_field_large.jpg');
          image.setAttribute('alt', 'Town of ' + h2.textContent)
          caption.appendChild(image)
        }

        document.querySelector('div.town_cards').appendChild(caption);
    }
  });


// ------------- Consume Weather API for Preston Page ---------------- //

const apiURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&APPID=b850fbcd027801228eb544e5bbb816db&units=imperial"

fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {

    // const imagesrc = 'https://openweathermap.org/img/w/' + jsObject.weather[0].icon + '.png';  // note the concatenation
    // const desc = jsObject.weather[0].description;  // note how we reference the weather array
    document.querySelector('#current_1').textContent = jsObject.main.temp;
    document.querySelector('#current_2').textContent = jsObject.main.temp_max;
    document.querySelector('#current_4').textContent = jsObject.main.humidity;
    document.querySelector('#current_5').textContent = jsObject.wind.speed;
  });

const apiForecast = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&APPID=b850fbcd027801228eb544e5bbb816db&units=imperial"

fetch(apiForecast)
  .then((response) => response.json())
  .then((jsObject) => {
    let forecast = jsObject.list.filter(x => x.dt_txt.includes('18:00:00')); // Gets a new array from all forecast days at 1800 hours

    const dayofWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let step = 0; step < 5; step++) {
      // Loop through each of the next 5 forecast days
      let d = new Date(forecast[step].dt_txt); // Creates a new date with the information from the JSON
      let image = 'https://openweathermap.org/img/w/' + forecast[step].weather[0].icon + '.png';
      document.querySelector(`#dayoftheweek${step+1}`).textContent = dayofWeek[d.getDay()];
      document.querySelector(`#img${step+1}`).setAttribute('src', image)
      document.querySelector(`#img${step+1}`).setAttribute('alt', forecast[step].weather[0].description)
      document.querySelector(`#forecast${step+1}`).textContent = (Math.round(forecast[step].main.temp));
    };
  });