const list = document.querySelector('#list');

steps = [];
images = [];
items = [];

function randomNumer(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function loadSteps(count) {
  await axios
    .get(`https://hargrimm-wikihow-v1.p.rapidapi.com/steps?count=${count}`, {
      headers: {
        'x-rapidapi-host': 'hargrimm-wikihow-v1.p.rapidapi.com',
        'x-rapidapi-key': '50f17c85acmshc63432788d36446p1f073ejsnc086e964e83c',
        useQueryString: true,
      },
    })
    .then((res) => {
      steps.push(res.data);
    })
    .catch((err) => console.log(err));
}

async function loadImages(count) {
  await axios
    .get(`https://hargrimm-wikihow-v1.p.rapidapi.com/images?count=${count}`, {
      headers: {
        'x-rapidapi-host': 'hargrimm-wikihow-v1.p.rapidapi.com',
        'x-rapidapi-key': '50f17c85acmshc63432788d36446p1f073ejsnc086e964e83c',
        useQueryString: true,
      },
    })
    .then((res) => {
      images.push(res.data);
    })
    .catch((err) => console.log(err));
}

function combineItems() {
  count = randomNumer(4, 13);
  console.log(count);
  loadSteps(count).then(() => {
    loadImages(count).then(() => {
      items = Object.values(steps[0]).map((element, i) => [
        element,
        Object.values(images[0])[i],
      ]);

      items.forEach((item, index) => {
        list.innerHTML += `
          <li class="item list-group-item">
            <div class="card mb-3 text-white bg-dark" style="max-width: 600px">
              <img class="card-img-top" src="${item[1]}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">
                  <span class="index">${++index}:</span> ${item[0]}
                </h5>
              </div>
            </div>
          </li>
        `;
      });
    });
  });
}

combineItems();