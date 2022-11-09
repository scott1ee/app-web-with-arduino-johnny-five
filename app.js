// Llamamos todas las dependencias 
// y abrimos nuestro servidor local
const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const { Board, Led } = require('johnny-five');
const board = new Board({ repl: false });
const express = require('express');

app.use('/public', express.static('public'));
// Aqui mostramos el html 
// En nuestro servidor local
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app.html');
});
// Aqui inicializamos el servidor 
// En el puerto 3000
server.listen(3000, () => {
  console.log('Estoy en http://localhost:3000');
});
// Llamamos la conexion al arduino 
board.on('ready', () => {
  // Creamos constantes
  // y almacenamos sus puertos en el arduino
  const led = new Led(13);
  const venti2 = new Led(11);

  io.on('connection', (socket) => {
    console.log('ESTAMOS');
    // Prendemos y apagamos leds
    socket.on('onLed', () => {
      led.on();
    })

    socket.on('offLed', () => {
      led.off();
    })
    // Prendemos y apagamos ventiladores
    socket.on('onVenti', () => {
      venti2.on();
    })

    socket.on('offVenti', () => {
      venti2.off();
    })
  })
});