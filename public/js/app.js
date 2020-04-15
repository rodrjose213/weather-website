

const getWeather = (address = '') => {
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location || '';
                messageTwo.textContent = `${data.summary} ${data.forecast}` || '';
                messageThree.textContent = `${data.precipChance} ${data.clouds}` || '';
                messageFour.textContent = `${data.wind}` || '';
            }

        })
    });
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');

messageOne.textContent = '';
messageTwo.textContent = '';
messageThree.textContent = '';
messageFour.textContent = '';


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    getWeather(location);
})