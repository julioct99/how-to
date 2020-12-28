const list = document.querySelector('#list');
const searchInput = document.querySelector('#search-input');
const searchForm = document.querySelector('#search-form');
const reloadBtn = document.querySelector('#reload-btn');

let steps = [];
let images = [];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function fetchSteps(count) {
  await axios
    .get(`https://hargrimm-wikihow-v1.p.rapidapi.com/steps?count=${count}`, {
      headers: {
        'x-rapidapi-host': 'hargrimm-wikihow-v1.p.rapidapi.com',
        'x-rapidapi-key': '50f17c85acmshc63432788d36446p1f073ejsnc086e964e83c',
        useQueryString: true,
      },
    })
    .then(res => steps.push(res.data))
    .catch(err => console.log(err));
}

async function fetchImages(count) {
  await axios
    .get(`https://hargrimm-wikihow-v1.p.rapidapi.com/images?count=${count}`, {
      headers: {
        'x-rapidapi-host': 'hargrimm-wikihow-v1.p.rapidapi.com',
        'x-rapidapi-key': '50f17c85acmshc63432788d36446p1f073ejsnc086e964e83c',
        useQueryString: true,
      },
    })
    .then(res => images.push(res.data))
    .catch(err => console.log(err));
}

function getItems(steps, images) {
  return Object.values(steps[0]).map((element, i) => [
    element,
    Object.values(images[0])[i],
  ]);
}

function renderItems(items) {
  items.forEach((item, i) => {
    list.innerHTML += `
          <li class="item list-group-item">
            <div class="card mb-3 text-white bg-dark" style="max-width: 600px">
              <img class="card-img-top" src="${item[1]}" alt="Step ${i} image">
              <div class="card-body">
                <h5 class="card-title">
                  <span class="index">${++i} </span> ${item[0]}
                </h5>
              </div>
            </div>
          </li>
        `;
  });
}

function clearList() {
  list.innerHTML = '';
  steps = [];
  images = [];
}

function loadSearchListener() {
  searchForm.addEventListener('submit', event => {
    loadSteps();
    event.preventDefault();
  });
}

async function loadSteps() {
  clearList();
  const count = randomNumber(4, 13);
  await fetchSteps(count);
  await fetchImages(count);
  renderItems(getItems(steps, images));
}

loadSearchListener();
