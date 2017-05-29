const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));

server.listen(3000, () => console.log('Server started!'));

const arrUsername = [];

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('DANG_KY_USERNAME', username => {
        const isExist = arrUsername.indexOf(username) !== -1;
        if (isExist) return socket.emit('XAC_NHAN_DANG_KY', false);
        arrUsername.push(username);
        socket.emit('XAC_NHAN_DANG_KY', true);
    });
});
