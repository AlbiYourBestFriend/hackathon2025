const { io: Client } = require("socket.io-client");

const express = require('express');
const http = require('node:http');
const { Server } = require('socket.io');
const axios = require('axios');
const { SerialPort } = require('serialport')

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000

const arduinoPort = '/dev/ttyACM0';
const baudRate = 9600;

const portSerie = new SerialPort({
    path: arduinoPort,
    baudRate: baudRate,
    autoOpen: false
});

portSerie.on('open', () => {
    console.log('Port série ouvert');
});

portSerie.on('data', (data) => {
    const sensorData = data.toString().trim();
    console.log('Donnée Arduino lue:', sensorData);

    io.emit('arduinoData', sensorData);
});

portSerie.on('error', (err) => {
    console.log('Erreur du port série:', err);
});

portSerie.open((err) => {
    if (err) {
        console.error('Erreur d\'ouverture du port série:', err.message);
    }
});


app.set('view engine', 'pug')
app.use(express.static('assets'))

app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.render('index', { title: 'SGT', message: 'bonjour, je suis lucie et j`ai le syndorme de PUTe de la tourette!' })
})

io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté');

    let stress = 0.1;
    setInterval(() => {
        stress += 0.1;
        socket.emit('stress', stress);
    }, 2000);
    socket.on('question', async(question) => {
        console.log(`Question reçue: ${question}`);

        try {
            const response = await axios.post('http://localhost:5000/', { message: question });
            console.log("Réponse du serveur Python:", response.data);

            socket.emit('response', response.data);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la requête à Python:', error);
            socket.emit('response', { error: 'Erreur lors de la requête Python.' }); // Message d'erreur au client
        }
    });
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})