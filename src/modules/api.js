export default class Api {
  constructor(wrapper) {
    this.id = 'q9yLkPTuqwnDTYXt3kuB';
    this.url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.id}/scores`;
    this.wrapper = wrapper;
  }

  async postData(data) {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async fetchData() {
    const response = await fetch(this.url, {
      method: 'GET',
    });
    return response.json();
  }

    render = (data) => {
      const li = document.createElement('li');
      li.innerHTML = `${data.user} : ${data.score}`;
      li.className = 'list-item';
      this.wrapper.appendChild(li);
    };

    renderAll = (arr) => {
      this.wrapper.innerHTML = '';
      const div = document.createElement('div');
      arr.forEach((data) => {
        const li = document.createElement('li');
        li.innerHTML = `${data.user} : ${data.score}`;
        li.className = 'list-item';
        div.appendChild(li);
      });
      this.wrapper.appendChild(div);
    }
}