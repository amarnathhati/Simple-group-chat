const form = document.querySelector('form');
const contentInput = document.querySelector('#content');
const messagesDiv = document.querySelector('#messages');


const username = localStorage.getItem('username');

function renderMessages(messages) {
  messagesDiv.innerHTML = '';
  messages.forEach(message => {
    const p = document.createElement('p');
    p.innerText = `${message.username}: ${message.content}`;
    messagesDiv.appendChild(p);
  });
}


function getMessages() {
  fetch('/messages')
    .then(response => response.json())
    .then(messages => {
      renderMessages(messages);
    });
}


getMessages();


form.addEventListener('submit', event => {
  event.preventDefault();

  
  const content = contentInput.value;

  
  fetch('/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      content
    })
  })
    .then(() => {
     
      contentInput.value = '';
      getMessages();
    });
});
