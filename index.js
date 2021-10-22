// const cv = require('opencv4nodejs');
const express = require('express');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const app = express();

const NodeWebcam = require("node-webcam");


const server = require('http').Server(app);
const io = require('socket.io')(server);

console.log("There is no god, well, I can't say. Something is there...");


// server configuration

app.use(express.static("public/home_auto/build"));
//app.use(express.static("public"));


const PORT = 8080;
var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');

app.use(express.json());

LED.writeSync(1);

app.get('/', (req, res) => {
	res.sendFile("/home/ubuntu/HomeAuto/public/home_auto/build/index.html");
});

app.post('/changeState', (req, res) => {
	let { deviceId, val } = req.body;
	console.log(`Received request - Turn Device ID - ${deviceId} ${val == 1 ? 'ON' : 'OFF'}`);
	val = val == 1 ? 0 : 1;
	LED.writeSync(parseInt(val));
	res.send(JSON.stringify({
		'message': 'device switched successfully :)'
	}));
});


setInterval(() => {
	// execSync(`sudo fswebcam /home/ubuntu/HomeAuto/image.jpg -r "600x600"`, (error, stdout, stderr) => {
	// 	if (error) {
	// 		console.log(`error: ${error.message}`);
	// 		return;
	// 	}
	// 	if (stderr) {
	// 		console.log(`stderr: ${stderr}`);
	// 		return;
	// 	}
	// });
	// const content = fs.readFileSync('./image.jpg', { encoding: 'base64' });

	NodeWebcam.capture("picture.tmp", {
		width: 400,
		height: 400,
		quality: 50,
		frames: 1,
		verbose: false,
		saveShots: false,
		callbackReturn: "base64",
		delay: 1
	}, function (err, data) {
		io.emit('image', data);
	});
}, 1000);

app.post('/capturePic', (req, res) => {
	//  execSync(`sudo fswebcam /home/ubuntu/HomeAuto/image.jpg -r "600x600"`, (error, stdout, stderr) => {
	//  	if (error) {
	//  		console.log(`error: ${error.message}`);
	//  		return;
	//  	}
	//  	if (stderr) {
	//  		console.log(`stderr: ${stderr}`);
	//  		return;
	//  	}
	//  });



	// NodeWebcam.capture("picture.tmp", { saveShots: false, callbackReturn: "base64" }, function (err, data) {
		// For example use a custom write
		// fs.writeFileSync("picture.png", data);

		// console.log('imagedata', data, err);
		// Erase temp file created
		// fs.unlinkSync("picture.tmp");

		// const content = fs.readFileSync('./image.jpg', { encoding: 'base64' });
		res.send(JSON.stringify({ message: 'image captured successfully', imageData: 'data' }))
	// });



	// console.log(`stdout: ${stdout}`);

})

// making the server to listen to requests
server.listen(PORT, () => {
	console.log(`Server running at: http://localhost:${PORT}/`);
});


process.on('SIGINT', function (code) {
	console.log('terminating node server');
	LED.writeSync(1);
	// LED.unexport(); // Unexport GPIO to free resources
	process.exit(1)
});
