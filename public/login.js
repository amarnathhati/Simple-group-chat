const form = document.querySelector('form');
const usernameInput = document.querySelector('#username');

form.addEventListener('submit', event => {
  event.preventDefault();

  
  const username = usernameInput.value;

  
  localStorage.setItem('username', username);

 
  window.location.href = '/';
});
