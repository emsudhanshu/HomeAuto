const express = require('express');

const path = require('path');

console.log("There is no god, well, I can't say. Something is there...");

const app = express();

// // server configuration
app.use('/static', express.static('public'))


const PORT = 8080;
var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');

app.use(express.json());


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/changeState', (req, res) => {
	let { deviceId, val } = req.body;
	console.log(`Received request - Turn Device ID - ${deviceId} ${val == 1 ? 'ON' : 'OFF'}`);
	val = val == 1 ? 0 : 1;
	LED.writeSync(parseInt(val));
	res.send(JSON.stringify({
		'message': 'device state changed successfully :)'
	}));

});

//
// making the server to listen to requests
app.listen(PORT, () => {
	console.log(`Server running at: http://localhost:${PORT}/`);
});
