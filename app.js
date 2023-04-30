
const express = require('express');
const http = require('http');
const fs = require('fs');


const app = express();
const server = http.createServer(app);


app.use(express.static('public'));


const messagesFile = './messages.json';

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.post('/send', (req, res) => {
 
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
  
    const message = JSON.parse(body);

    
    let messages = [];
    if (fs.existsSync(messagesFile)) {
      messages = JSON.parse(fs.readFileSync(messagesFile, 'utf-8'));
    }

    
    messages.push({
      username: message.username,
      content: message.content
    });

   
    fs.writeFileSync(messagesFile, JSON.stringify(messages));

    
    res.redirect('/');
  });
});


app.get('/messages', (req, res) => {
 
  let messages = [];
  if (fs.existsSync(messagesFile)) {
    messages = JSON.parse(fs.readFileSync(messagesFile, 'utf-8'));
  }

  
  res.json(messages);
});


server.listen(3000, () => {
  console.log('Server started on port 3000');
});
