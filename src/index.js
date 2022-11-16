import './style.css';
import Api from './modules/api.js';

const list = document.querySelector('.list');

const loader = (element) => {
  element.innerHTML = `<div class="loader">
                          <p>Loading...</p>
                      </div>`;
};

document.addEventListener('DOMContentLoaded', () => {
  const game = new Api(list);

  loader(list);
  game.fetchData()
    .then((data) => { game.renderAll(data.result); });

  // Create Function
  document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const score = e.target.score.value;
    game.postData({ user: name, score })
      .then((data) => {
        if (data) {
          game.render({ user: name, score });
          e.target.name.value = '';
          e.target.score.value = '';
        }
      });
  };

  // Refresh Function
  document.querySelector('.btn').onclick = () => {
    loader(list);
    game.fetchData()
      .then((data) => { game.renderAll(data.result); });
  };
});

// const render = (data) => {
//   const li = document.createElement('li');
//   li.innerHTML = `${data.user} : ${data.score}`;
//   li.className = 'list-item';
//   list.appendChild(li);
// };

// async function postData(data) {
//   const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });
//   return response.json();
// }

// async function fetchData() {
//   const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`, {
//     method: 'GET',
//   });
//   return response.json();
// }
