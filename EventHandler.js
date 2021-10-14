const socket = io();
const name = prompt('Whats your name?')
const chatForm = document.querySelector('#chat-form');
const chatMes = document.querySelector('#chat-mes');

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatMes.value;
    socket.emit('on-chat', {
        name,
        message: message
    });
    chatMes.value = '';
    document.getElementById("send-chat").scrollIntoView();
})

const messages = document.querySelector('#messages');
socket.on('user-chat', (data) => {
    const chatItem = document.createElement('li');
    chatItem.textContent = `${data.name}: ${data.message}`;

    messages.appendChild(chatItem);
})