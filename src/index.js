import './style.css';

const gameId = 'q9yLkPTuqwnDTYXt3kuB';
const list = document.querySelector('.list');

const render = (data) => {
  const li = document.createElement('li');
  li.innerHTML = `${data.user} : ${data.score}`;
  li.className = 'list-item';
  list.appendChild(li);
};

async function postData(data) {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function fetchData() {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`, {
    method: 'GET',
  });
  return response.json();
}

document.querySelector('form').onsubmit = (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const score = e.target.score.value;
  postData({ user: name, score })
    .then((data) => {
      if (data) {
        render({ user: name, score });
        e.target.name.value = '';
        e.target.score.value = '';
      }
    });
};

document.addEventListener('DOMContentLoaded', () => {
  fetchData()
    .then((data) => {
      data.result.forEach((item) => { render(item); });
    });
});

document.querySelector('.btn').onclick = () => {
  list.innerHTML = '';
  fetchData()
    .then((data) => {
      data.result.forEach((item) => { render(item); });
    });
};
